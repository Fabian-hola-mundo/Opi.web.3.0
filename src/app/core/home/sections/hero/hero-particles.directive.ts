import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
}

@Directive({
  selector: '[appHeroParticles]',
})
export class HeroParticlesDirective implements OnInit, OnDestroy {
  readonly particleCount = input(100);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private animFrameId?: number;
  private particles: Particle[] = [];
  private linesMesh?: THREE.LineSegments;

  private mouseX = 0;
  private mouseY = 0;
  private scrollVelocityBoost = 0;

  private readonly onMouseMove = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private readonly onScroll = () => {
    this.scrollVelocityBoost = Math.min(window.scrollY / 1000, 1.5);
  };

  private readonly onResize = () => {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    const aspect = w / h;
    const frustum = 2;
    this.camera.left = -frustum * aspect;
    this.camera.right = frustum * aspect;
    this.camera.top = frustum;
    this.camera.bottom = -frustum;
    this.camera.updateProjectionMatrix();
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Run outside Angular zone to avoid triggering change detection on every frame
    this.ngZone.runOutsideAngular(() => this.init());
  }

  private init(): void {
    const host = this.el.nativeElement as HTMLElement;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const aspect = w / h;
    const frustum = 2;

    // Scene
    this.scene = new THREE.Scene();

    // Orthographic camera (easier to position particles in normalized coords)
    this.camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect,
      frustum, -frustum,
      0.1, 10,
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Style the canvas
    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    host.appendChild(canvas);

    // Create particles
    const colors = [0xfc9d23, 0x7d3693];
    const count = this.particleCount();
    const geometry = new THREE.CircleGeometry(0.015, 8);

    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: colors[i % 2] });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(
        (Math.random() - 0.5) * frustum * aspect * 2,
        (Math.random() - 0.5) * frustum * 2,
        0,
      );
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
      });
    }

    // Lines geometry (pre-allocated)
    const maxLines = count * count;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.3 });
    this.linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.linesMesh);

    // Events
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.animate();
  }

  private animate(): void {
    this.animFrameId = requestAnimationFrame(() => this.animate());
    if (!this.scene || !this.camera || !this.renderer || !this.linesMesh) return;

    const aspect = window.innerWidth / window.innerHeight;
    const frustum = 2;
    const halfW = frustum * aspect;
    const halfH = frustum;
    const connectionDistance = 0.35; // normalized units ~120px

    const posAttr = this.linesMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = this.linesMesh.geometry.getAttribute('color') as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;
    let lineIdx = 0;

    const speedBoost = 1 + this.scrollVelocityBoost;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Soft attraction toward mouse
      const dx = this.mouseX * halfW - p.mesh.position.x;
      const dy = this.mouseY * halfH - p.mesh.position.y;
      p.vx += dx * 0.00003;
      p.vy += dy * 0.00003;

      // Speed limit
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 0.008 * speedBoost;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.mesh.position.x += p.vx * speedBoost;
      p.mesh.position.y += p.vy * speedBoost;

      // Wrap around edges
      if (p.mesh.position.x > halfW) p.mesh.position.x = -halfW;
      else if (p.mesh.position.x < -halfW) p.mesh.position.x = halfW;
      if (p.mesh.position.y > halfH) p.mesh.position.y = -halfH;
      else if (p.mesh.position.y < -halfH) p.mesh.position.y = halfH;

      // Draw connection lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const ddx = p.mesh.position.x - p2.mesh.position.x;
        const ddy = p.mesh.position.y - p2.mesh.position.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < connectionDistance) {
          const alpha = 1 - dist / connectionDistance;
          const base = lineIdx * 6;
          posArr[base]     = p.mesh.position.x;
          posArr[base + 1] = p.mesh.position.y;
          posArr[base + 2] = 0;
          posArr[base + 3] = p2.mesh.position.x;
          posArr[base + 4] = p2.mesh.position.y;
          posArr[base + 5] = 0;
          // Gray line color, fade by alpha
          const c = alpha * 0.5;
          colArr[base]     = c; colArr[base + 1] = c; colArr[base + 2] = c;
          colArr[base + 3] = c; colArr[base + 4] = c; colArr[base + 5] = c;
          lineIdx++;
        }
      }
    }

    // Update draw range
    this.linesMesh.geometry.setDrawRange(0, lineIdx * 2);
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== undefined) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.renderer?.dispose();
    this.particles.forEach(p => {
      p.mesh.geometry.dispose();
      (p.mesh.material as THREE.Material).dispose();
    });
    this.linesMesh?.geometry.dispose();
  }
}
