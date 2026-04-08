# OPI Web 2026 — Landing Page MVP: Design Spec

**Date:** 2026-04-08
**Author:** Brian (Design Engineer)
**Status:** Approved — ready for implementation
**Version:** 1.0

---

## 1. Objetivo

Construir la landing page MVP de OPI Technology: una single-page de scroll que convierta visitas de tomadores de decisión del sector privado en reuniones calificadas. La métrica de éxito es la interacción con la "Trifecta de Contacto".

---

## 2. Decisiones de Diseño

| Decisión | Elección | Razón |
|----------|----------|-------|
| Tipo de página | Single-page scroll (una ruta `/`) | MVP enfocado; rutas adicionales en Fase 2 |
| Trifecta de Contacto | FAB flotante post-Hero + sección final dedicada | Máxima cobertura de conversión sin interferir el primer impacto |
| i18n | `@angular/localize` (build-time, bundle por idioma) | Bundles separados `/es/` y `/en/`; reload al cambiar idioma |
| Animaciones scroll | `InViewDirective` nativa (Intersection Observer API) | 100% SSR-safe, sin dependencias externas, ~30 líneas |
| Arquitectura renderizado | `@defer (on viewport)` para secciones below-the-fold | LCP óptimo; el CEO ve contenido al instante |
| Hero background | Three.js — partículas conectadas reactivas a mouse + scroll | Metáfora visual "red de conexiones"; fallback CSS para SSR |
| ShaderGradient | Descartado — React-only, no compatible con Angular | Reemplazado por Three.js nativo equivalente |
| Dark/Light mode | CSS custom properties + `data-theme` en `<html>` | Sin JS en crítica de render; dark por defecto (design system) |
| Framework UI | Angular 21.2 standalone + SCSS tokens | Sin NgModules; design system como variables SCSS |
| Formulario | Firebase (Cloud Firestore o Realtime DB) | Ya en stack; serverless, sin backend propio |
| Remotion | Descartado del MVP | React-only; animaciones avanzadas para Fase 2 con GSAP |

---

## 3. Estructura de Archivos

```
src/app/
├── core/                                   ← Feature principal (landing)
│   ├── home/
│   │   ├── home.component.ts               ← Shell con @defer blocks
│   │   ├── home.component.html
│   │   ├── home.component.scss
│   │   └── sections/
│   │       ├── hero/
│   │       │   ├── hero.component.ts
│   │       │   ├── hero.component.html
│   │       │   ├── hero.component.scss
│   │       │   └── hero-particles.directive.ts  ← Three.js, mouse/scroll
│   │       ├── social-proof/
│   │       ├── pain-block/
│   │       ├── bridge/
│   │       ├── metrics/
│   │       └── contact-section/
│   └── shared/
│       ├── directives/
│       │   └── in-view.directive.ts        ← Intersection Observer
│       ├── components/
│       │   ├── opi-button/
│       │   ├── opi-badge/
│       │   ├── opi-card/
│       │   ├── opi-accordion-item/
│       │   ├── opi-metric-cell/
│       │   ├── opi-logo-tile/
│       │   ├── opi-section-wrapper/
│       │   └── contact-fab/                ← FAB flotante Trifecta
│       └── styles/
│           ├── _tokens.scss                ← Design tokens (CSS custom props)
│           ├── _typography.scss            ← Escala tipográfica
│           └── _animations.scss            ← Clases de fade/slide-in
├── services/
│   ├── theme.service.ts                    ← Signal theme, localStorage
│   └── form.service.ts                     ← Firebase submit
├── i18n/
│   ├── messages.es.xlf
│   └── messages.en.xlf
└── app.routes.ts                           ← lazy load HomeComponent
```

---

## 4. Secciones de la Página (6 secciones)

### 4.1 Hero — SSR · Above the fold

- **Contenido:** Headline display-lg (Inter Bold), subtítulo propuesta de valor, 2 CTAs (primario: "Agendar reunión" con gradiente naranja→morado; secundario: "Cuéntanos tu reto")
- **Background:** `HeroParticlesDirective` — Three.js canvas, partículas naranjas/moradas interconectadas que reaccionan a `mousemove` y `scroll`. Guarda con `isPlatformBrowser()` para SSR. Fallback: CSS `background: radial-gradient(...)` con los colores de marca.
- **Layout:** Texto a la izquierda (60%), canvas de fondo a pantalla completa. Fondo: `#0d0d0e` (near-black, consistente con moodboard Accenture/OpenAI).

### 4.2 Social Proof — SSR · Logos

- **Contenido:** Carrusel horizontal automático de logos de clientes/aliados sector público. Tagline institucional debajo.
- **Implementación:** CSS `scroll-snap` con `overflow-x: auto` y autoplay vía `setInterval` Angular. Sin Swiper para mantener cero dependencias extra. Todos los logos usando `NgOptimizedImage` para LCP.
- **Background:** `surface` (light mode) / `inverse_surface` (dark mode).

### 4.3 Pain Block — `@defer (on viewport)`

- **Contenido:** 3 tarjetas `opi-card` con un problema real del sector privado cada una. Ícono funcional + título + descripción breve.
- **Animación:** `InViewDirective` dispara clase `.in-view` → `opacity: 0 → 1` + `translateY(20px → 0)` con `transition-delay` escalonado.
- **Background:** `surface-container-low`.

### 4.4 Bridge / Casos de Éxito — `@defer (on viewport)`

- **Contenido:** Lista de `opi-accordion-item` con esquema: Cliente + Reto + Resultado Cuantificable. Mínimo 3 casos.
- **Implementación:** Signal `openIndex = signal<number | null>(null)` en el componente padre. Cada `opi-accordion-item` recibe `isOpen = computed(() => openIndex() === index)`.
- **Background:** `surface`.

### 4.5 Metrics / Bento Grid — `@defer (on viewport)`

- **Contenido:** Grid de 4+ celdas `opi-metric-cell` con números de impacto (años, proyectos, disponibilidad, etc.).
- **Animación:** `CountUpDirective` — incrementa el número de 0 al valor final cuando entra en viewport. Duración: 1.5s ease-out.
- **Estética:** Fondo `inverse_surface` (dark siempre, independiente del tema). Números en `secondary` (#fc9d23).
- **Layout:** CSS Grid asimétrico — algunas celdas ocupan 2 columnas (bento style). Inspiración Samsung S26 metrics section.

### 4.6 Contact Section / Trifecta Final — `@defer (on viewport)`

- **Contenido:** 3 tarjetas grandes: Booking (Microsoft Booking iframe/link), Formulario de Retos (formulario Angular → Firebase), WhatsApp Business (link directo con mensaje pre-cargado).
- **Background:** `inverse_surface` con gradiente sutil de marca.
- **Formulario:** Campos mínimos: Nombre, Empresa, Reto (textarea), Email. Validación reactiva Angular. Submit vía `FormService` a Firebase Cloud Firestore (colección `contact-submissions`).

---

## 5. Componentes Reutilizables (Shared)

Cada componente:
- Es standalone (sin NgModules)
- Usa `input()` signals y `output()` para comunicación
- Tiene `ChangeDetectionStrategy.OnPush`
- Acepta tokens de tema vía CSS custom properties (no hardcoded)
- Tiene `@if` para estados empty/loading donde aplique

| Componente | Inputs principales | Propósito |
|-----------|-------------------|-----------|
| `opi-button` | `label`, `variant: 'primary'\|'secondary'\|'ghost'`, `href?` | CTA reutilizable |
| `opi-badge` | `text`, `color` | Etiqueta de categoría |
| `opi-card` | `title`, `body`, `accentColor?`, `icon?` | Tarjeta de contenido |
| `opi-accordion-item` | `title`, `content`, `isOpen: Signal<boolean>` | Ítem de accordion |
| `opi-metric-cell` | `value`, `label`, `span?: 1\|2` | Celda bento grid |
| `opi-logo-tile` | `src`, `alt`, `width`, `height` | Logo con NgOptimizedImage |
| `opi-section-wrapper` | `id`, `theme?`, `paddingScale?` | Wrapper de sección con InView |
| `contact-fab` | — | FAB flotante Trifecta |

---

## 6. Dark/Light Mode

```scss
// _tokens.scss — CSS custom properties
:root {
  // Light mode (default fallback)
  --color-surface: #fcf8f9;
  --color-surface-low: #f6f3f4;
  --color-surface-lowest: #ffffff;
  --color-surface-high: #eae7e8;
  --color-on-surface: #1b1b1c;
  --color-primary: #631b7a;
  --color-secondary: #fc9d23;
  --color-secondary-container: #fc9d23;
  --color-primary-container: #7d3693;
  --color-inverse-surface: #303031;
  --color-inverse-on-surface: #f3f0f1;
  --color-outline-variant: rgba(209, 194, 208, 0.15);
}

[data-theme="dark"] {
  --color-surface: #0d0d0e;
  --color-surface-low: #1a1a1b;
  --color-surface-lowest: #111112;
  --color-surface-high: #252526;
  --color-on-surface: #f3f0f1;
  // primary/secondary remain the same — brand colors are theme-agnostic
}
```

`ThemeService`:
- `theme = signal<'light' | 'dark'>('dark')` — dark por defecto
- `effect()` que actualiza `document.documentElement.dataset.theme`
- Persiste en `localStorage` con clave `opi-theme`
- Guarda `isPlatformBrowser()` para SSR

---

## 7. Hero Particles — Three.js

`HeroParticlesDirective` (o componente canvas):
- Solo se inicializa en browser (`isPlatformBrowser()`)
- Canvas `position: absolute`, `z-index: 0`, `pointer-events: none`
- ~80-120 partículas, colores `--color-secondary` (#fc9d23) y `--color-primary-container` (#7d3693)
- Conexiones entre partículas con distancia < 120px
- `mousemove` event: cada partícula tiene una fuerza de atracción suave hacia el cursor
- `scroll` event: `scrollY` modula la velocidad y dispersión de las partículas
- `ngOnDestroy`: limpia `animationFrameId`, remueve event listeners
- SSR fallback: CSS `background: radial-gradient(ellipse at 20% 50%, rgba(125,54,147,0.3), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(252,157,35,0.2), transparent 60%), #0d0d0e`

---

## 8. InView Directive

```typescript
// Dispara clase 'in-view' cuando el elemento entra al viewport
// Uso: <div appInView class="fade-in-up">
@Directive({ selector: '[appInView]', standalone: true })
export class InViewDirective implements OnInit, OnDestroy {
  threshold = input(0.15);
  // Usa IntersectionObserver; desconecta después del primer trigger
  // isPlatformBrowser guard para SSR
}
```

---

## 9. Dependencias a Instalar

```bash
npm install three @types/three    # Hero particles
# Swiper descartado — carrusel implementado con CSS scroll-snap nativo
```

`@angular/localize` ya está incluido en Angular 21.

---

## 10. Skills a Invocar Durante Implementación

- `brand-guidelines` — Al construir cada componente shared para validar consistencia visual
- `opi-design-area` — Referencia al design system OPI (tokens, tipografía, colores)
- `vercel-react-best-practices` — Patrones de componentes reutilizables Angular

---

## 11. Out of Scope (MVP)

- Páginas de detalle de servicios o casos de éxito (`/servicios/:slug`, `/casos/:slug`)
- Blog / sección de empleos
- Remotion / animaciones de video intro
- CMS externo (Contentful, Sanity)
- Analytics (Fase 2)
- Three.js shaders GLSL complejos (Fase 2 si se requiere más calidad visual)
