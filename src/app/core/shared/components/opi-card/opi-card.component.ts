import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

export type OpiCardScene = 'sphere' | 'torus' | 'knot';

interface SceneConfig {
  geometry: THREE.BufferGeometry;
  offset: THREE.Vector3;
  wireColor: number;
  ptsColor: number;
  ptsSize: number;
  initRot: { x: number; y: number };
}

@Component({
  selector: 'opi-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': 'onHover(true)',
    '(mouseleave)': 'onHover(false)',
  },
  template: `
    <!-- Visual layer: canvas + gradient overlay — both blur on hover via CSS -->
    <div class="card__visual">
      <canvas #canvas class="card__canvas" aria-hidden="true"></canvas>
      <div class="card__overlay"></div>
    </div>

    <!-- Text layer: sits above the blur, never blurs -->
    <div class="card__content">
      <header class="card__header">
        @if (category()) {
          <span class="card__category">{{ category() }}</span>
        } @else if (icon()) {
          <span class="card__icon" aria-hidden="true">{{ icon() }}</span>
        }
      </header>
      <footer class="card__footer">
        <h3 class="card__title">{{ title() }}</h3>
        @if (body()) {
          <p class="card__body">{{ body() }}</p>
        }
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: #07030e;
      height: 100%;
      min-height: 440px;
      cursor: pointer;
      border: 1px solid rgba(99, 27, 122, 0.22);
      transition:
        transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1),
        border-color 300ms ease;

      &:hover {
        transform: translateY(-6px) scale(1.015);
        box-shadow:
          0 24px 64px rgba(99, 27, 122, 0.28),
          0 8px 24px rgba(0, 0, 0, 0.55);
        border-color: rgba(125, 54, 147, 0.65);
      }

      &:focus-within {
        outline: 2px solid var(--color-secondary);
        outline-offset: 3px;
      }
    }

    /* ── Visual layer (canvas + overlay) ────────────────────── */
    .card__visual {
      position: absolute;
      inset: 0;
      /* scale(1.06) prevents edge artifacts when blur spreads beyond card bounds */
      transform: scale(1.06);
      transition: filter 700ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host:hover .card__visual {
      filter: blur(7px);
    }

    .card__canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    .card__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        168deg,
        rgba(7, 3, 14, 0.0)  0%,
        rgba(7, 3, 14, 0.15) 30%,
        rgba(7, 3, 14, 0.72) 62%,
        rgba(7, 3, 14, 0.97) 100%
      );
      pointer-events: none;
    }

    /* ── Text layer (always sharp) ───────────────────────────── */
    .card__content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.5rem; /* 24px */
    }

    .card__header {
      display: flex;
      align-items: flex-start;
    }

    .card__category {
      font-family: var(--font-family-mono);
      font-size: var(--font-label);
      font-weight: var(--font-weight-bold);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
      padding-bottom: 3px;
    }

    .card__icon {
      font-size: 1.875rem;
      line-height: 1;
      filter: drop-shadow(0 0 10px rgba(252, 157, 35, 0.65));
    }

    .card__footer {
      display: flex;
      flex-direction: column;
      gap: 1.25rem; /* Mayor separación entre título y texto */
    }

    .card__title {
      font-family: var(--font-family-sans);
      font-size: clamp(1.2rem, 1.6vw + 0.4rem, 1.6rem);
      font-weight: var(--font-weight-bold);
      line-height: 1.25;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.025em;
    }

    .card__body {
      font-family: var(--font-family-sans);
      font-size: var(--font-body-sm);
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.48);
      margin: 0;
    }
  `],
})
export class OpiCardComponent implements AfterViewInit, OnDestroy {
  readonly title = input.required<string>();
  readonly body = input<string | undefined>(undefined);
  readonly accentColor = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly category = input<string | undefined>(undefined);
  readonly sceneType = input<OpiCardScene>('sphere');

  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly platformId = inject(PLATFORM_ID);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private geometry?: THREE.BufferGeometry;
  private wireMesh?: THREE.Mesh;
  private ptsMesh?: THREE.Points;
  private clock?: THREE.Clock;
  private frameId?: number;
  private originalPos?: Float32Array;
  private resizeObs?: ResizeObserver;

  private hovered = false;
  private speedCurrent = 1;
  private speedTarget = 1;

  /**
   * Time accumulator: advances at `speedCurrent` units per real second.
   * Using this instead of `elapsedTime * speed` prevents phase jumps when
   * speed changes — the sine/cosine phases stay continuous.
   */
  private timeAccum = 0;
  private lastElapsed = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScene();
    this.loop();
  }

  private buildSceneConfig(type: OpiCardScene): SceneConfig {
    switch (type) {
      case 'torus':
        return {
          geometry: new THREE.TorusGeometry(1.1, 0.44, 24, 80),
          offset: new THREE.Vector3(0.35, 0.25, 0),
          wireColor: 0x1535a8,
          ptsColor: 0x4d8aff,
          ptsSize: 0.026,
          initRot: { x: Math.PI * 0.35, y: Math.PI * 0.1 },
        };
      case 'knot':
        return {
          geometry: new THREE.TorusKnotGeometry(0.92, 0.3, 128, 16, 2, 3),
          offset: new THREE.Vector3(0.42, 0.3, 0),
          wireColor: 0x8a1060,
          ptsColor: 0xe050c5,
          ptsSize: 0.018,
          initRot: { x: 0.3, y: 0.4 },
        };
      default: // sphere
        return {
          geometry: new THREE.SphereGeometry(1.55, 52, 52),
          offset: new THREE.Vector3(0.55, 0.42, 0),
          wireColor: 0x7a22b5,
          ptsColor: 0xc878ff,
          ptsSize: 0.022,
          initRot: { x: 0, y: 0 },
        };
    }
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth || 320;
    const h = canvas.clientHeight || 360;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    this.camera.position.set(-0.25, 0.15, 3.6);

    this.clock = new THREE.Clock();

    const cfg = this.buildSceneConfig(this.sceneType());
    this.geometry = cfg.geometry;
    this.originalPos = (this.geometry.attributes['position'].array as Float32Array).slice();

    // Wireframe layer
    const wireMat = new THREE.MeshBasicMaterial({
      color: cfg.wireColor,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    this.wireMesh = new THREE.Mesh(this.geometry, wireMat);
    this.wireMesh.position.copy(cfg.offset);
    this.wireMesh.rotation.x = cfg.initRot.x;
    this.wireMesh.rotation.y = cfg.initRot.y;
    this.scene.add(this.wireMesh);

    // Point-cloud layer (shares geometry — vertex updates propagate automatically)
    const ptsMat = new THREE.PointsMaterial({
      color: cfg.ptsColor,
      size: cfg.ptsSize,
      transparent: true,
      opacity: 0.6,
    });
    this.ptsMesh = new THREE.Points(this.geometry, ptsMat);
    this.ptsMesh.position.copy(cfg.offset);
    this.ptsMesh.rotation.copy(this.wireMesh.rotation);
    this.scene.add(this.ptsMesh);

    this.resizeObs = new ResizeObserver(() => this.onResize());
    this.resizeObs.observe(canvas.parentElement ?? canvas);
  }

  private onResize(): void {
    if (!this.renderer || !this.camera) return;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  onHover(active: boolean): void {
    this.hovered = active;
    this.speedTarget = active ? 1.7 : 1;
  }

  private loop(): void {
    this.frameId = requestAnimationFrame(() => this.loop());
    if (!this.clock || !this.renderer || !this.scene || !this.camera || !this.geometry) return;

    // Delta-time: cap at 50 ms to avoid jumps after tab backgrounding
    const elapsed = this.clock.getElapsedTime();
    const delta = Math.min(elapsed - this.lastElapsed, 0.05);
    this.lastElapsed = elapsed;

    // Lazy lerp toward target speed (0.025 ≈ very gentle ease)
    this.speedCurrent += (this.speedTarget - this.speedCurrent) * 0.025;

    // Accumulate time proportionally to current speed — phases stay continuous
    this.timeAccum += delta * this.speedCurrent;
    const t = this.timeAccum;

    // Vertex morphing — wave displacement on original sphere/torus/knot surface
    const pos = this.geometry.attributes['position'];
    const arr = pos.array as Float32Array;
    const orig = this.originalPos!;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2];
      const wave =
        Math.sin(ox * 2.2 + t) * 0.09 +
        Math.cos(oy * 2.8 + t * 0.75) * 0.07 +
        Math.sin(oz * 1.8 + t * 1.3) * 0.05;
      const k = 1 + wave;
      arr[i] = ox * k;
      arr[i + 1] = oy * k;
      arr[i + 2] = oz * k;
    }
    pos.needsUpdate = true;

    // Rotation — driven by smooth speed, so hover only gently accelerates it
    const rs = this.speedCurrent;
    this.wireMesh!.rotation.x += 0.001 * rs;
    this.wireMesh!.rotation.y += 0.003 * rs;
    this.ptsMesh!.rotation.x = this.wireMesh!.rotation.x;
    this.ptsMesh!.rotation.y = this.wireMesh!.rotation.y;

    // Opacity lerp — subtle brightening on hover
    const wire = this.wireMesh!.material as THREE.MeshBasicMaterial;
    wire.opacity += ((this.hovered ? 0.50 : 0.32) - wire.opacity) * 0.04;

    const pts = this.ptsMesh!.material as THREE.PointsMaterial;
    pts.opacity += ((this.hovered ? 0.85 : 0.60) - pts.opacity) * 0.04;

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (this.frameId !== undefined) cancelAnimationFrame(this.frameId);
    this.resizeObs?.disconnect();
    this.geometry?.dispose();
    (this.wireMesh?.material as THREE.Material | undefined)?.dispose();
    (this.ptsMesh?.material as THREE.Material | undefined)?.dispose();
    this.renderer?.dispose();
  }
}
