# 📄 Contexto de Diseño UI/UX: OpiWeb 2026 💻

Instrucción para IA: Actúa como un experto en UI Design. Genera interfaces basadas en los principios de diseño y componentes detallados a continuación, priorizando la limpieza visual de Anthropic y la potencia de scroll de Samsung.



# 🎨 Principios de Interfaz

Moodboard: Accenture

1\. Minimalismo de Autoridad (Inspiración: Accenture: https://www.accenture.com/co-es): \* Concepto: El espacio en blanco no es "vacío", es elegancia y claridad. La tipografía (sans-serif de alto impacto) es el elemento gráfico principal.



Traducción Angular: Usaremos SCSS con variables de escala modular para que el espaciado (padding/margin) sea matemáticamente perfecto, igual que en Apple.
IMPORTANTE: Todos los tokens deben estar en Variables y puede ser modificable cuando se desee


2\. Scrollytelling Responsivo (Inspiración: Samsung S26 Ultra): \* Concepto: El usuario no solo baja la página; la página "reacciona" a su paso. Elementos que aparecen con fade-in suave o sutiles movimientos de escala.



Traducción Angular: Implementaremos Intersection Observer API (o la librería AOS) para disparar clases de CSS cuando los componentes entren en el viewport.



3\. Estética de Producto "Limpio" (Inspiración: Notion/Apple):



Concepto: Uso de "Bento Grids" (rejillas organizadas) para mostrar servicios y métricas. Bordes redondeados sutiles (8px a 12px) y sombras casi imperceptibles.



Estrategia de Dispositivo: Desktop-First para la experiencia inmersiva, adaptando el "Scrollytelling" a gestos táctiles simples en móvil.



# 🛠️ Componentes Requeridos (Arquitectura Angular)

Componente A: Módulo "Trifecta de Contacto" (Floating/Docked): \* Un bloque de navegación secundaria que permite saltar entre Booking, Form y WhatsApp.



Lógica de Código: Un componente con Signals para manejar el estado activo, evitando renderizados innecesarios.



Componente B: Bento-Grid de Métricas e Impacto: \* Inspirado en el pie de página de Apple. Cuadrículas donde cada celda es una métrica (ej. "99.9% Disponibilidad").



Lógica de Código: Usaremos CSS Grid dentro de un componente Standalone para máxima flexibilidad.



Estilo Visual: Limpio, institucional, alto contraste (Light & Dark Mode premium), uso de Skeletons de carga ultra-rápidos para una percepción de velocidad instantánea.

