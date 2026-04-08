# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                          # Dev server at localhost:4200
npm run build                      # Production build
npm run watch                      # Dev build with file watching
npm test                           # Run unit tests (Vitest)
npm run serve:ssr:Opi.web.3.0      # Run SSR server at port 4000 (after build)
```

To run a single test file:
```bash
npx vitest run src/app/app.spec.ts
```

## Architecture

**Angular 21.2 SSR Standalone App** — no NgModules anywhere.

### Entry Points
- `src/main.ts` — browser bootstrap
- `src/main.server.ts` — server bootstrap
- `src/server.ts` — Express server (SSR + static files, port `process.env.PORT || 4000`)
- `src/app/app.config.ts` / `app.config.server.ts` — client and server provider configs

### Routing
- `src/app/app.routes.ts` — client routes (use lazy loading for all features)
- `src/app/app.routes.server.ts` — server-side rendering strategies per route

### Key Patterns
- **State:** Angular Signals only — `signal()`, `computed()`, `effect()`. No NgRx.
- **DI:** Always `inject()` inside constructors/functions, never constructor parameter injection.
- **Change detection:** `ChangeDetectionStrategy.OnPush` on every component.
- **Control flow:** Native `@if`, `@for`, `@switch` — never `*ngIf`/`*ngFor`.
- **Host bindings:** Use `host: {}` object in `@Component`/`@Directive` — never `@HostBinding`/`@HostListener`.
- **Images:** `NgOptimizedImage` for all static images (not base64).
- **Forms:** Reactive forms, not template-driven.

### Styling
- Global styles: `src/styles.scss`
- Per-component SCSS with paths relative to the component `.ts` file.
- No `ngClass`/`ngStyle` — use `[class.foo]` and `[style.foo]` bindings.

### Testing
- Vitest + jsdom (not Karma/Jasmine).
- Test files co-located with source: `*.spec.ts`.

### Build Output
- Browser assets: `dist/Opi.web.3.0/browser/`
- SSR server: `dist/Opi.web.3.0/server/server.mjs`
- Initial bundle budget: 500KB warning / 1MB error.
