PRD de Contexto General: OpiWeb 2026 (MVP - Versión Core)



# 1\. Información del Proyecto

Proyecto: Rediseño Web \& Versión Comercial OPI 2026



Versión: v1.1 (MVP Lite - Sin Métricas)



Estado: Diseño / Desarrollo



Responsable: Brian (Design Engineer)



Fecha: 07/04/2026



# 2\. Resumen y Problema

Actualmente, la experiencia de OPI en el sector público no se percibe automáticamente como una ventaja competitiva para el sector privado. Necesitamos transformar la autoridad de la marca en una "credencial de confianza" visual que logre que un CEO del sector privado decida iniciar una conversación comercial.



# 3\. Contexto y Motivación

OPI es el puente entre la robustez del sector público y la agilidad del privado. El sitio debe proyectar esta autoridad mediante un diseño limpio, profesional y orientado a la acción inmediata, facilitando el contacto directo sin intermediarios.



# 4\. Objetivos

Objetivo principal: Construir el mínimo sistema web viable (MVP) que convierta visitas de tomadores de decisión en reuniones calificadas.



Objetivos secundarios:



Confianza por Asociación: Posicionar logos y testimonios como eje central de la prueba social.



Foco en Conversión: Maximizar el uso de la "Trifecta de Contacto".



Performance: Garantizar una carga instantánea mediante Angular SSR.



# 5\. Alcance (In / Out)

## 5.1 Incluye

Landing Page Principal: Hero, Propuesta de Valor, Casos de Éxito (Logos/Testimonios) y Servicios.



Trifecta de Contacto: Agendamiento (Microsoft Booking), Formulario de Retos y WhatsApp.



Infraestructura: Angular 21, SSR, Hosting en Azure y Firebase para el formulario.

Internacionalización: Traducciones.



# 9\. Requisitos Funcionales

Prioridad	Requisito	Descripción breve

Alta	Trifecta de Contacto	Integración de Microsoft Booking, Formulario de contacto y WhatsApp Business.

Alta	Prueba Social Estática	Sección de logos de clientes y aliados para generar confianza inmediata.

Alta	SSR (Angular Universal)	Renderizado del lado del servidor para SEO y velocidad.


# 10\. Experiencia de Usuario (UX) e IA

Principios: Autoridad B2B y navegación fluida.



Estrategia de Prueba Social: Asegurar que los logos y testimonios tengan un ritmo visual constante durante el scroll.



Simplicidad: Eliminar cualquier elemento distractor que no lleve a uno de los tres canales de contacto.



# 12\. Especificaciones Técnicas (Angular)

Arquitectura: Standalone Components para evitar la sobrecarga de NgModules y facilitar el Lazy Loading.



Estilos: SCSS (Crear componentes standalone atomizados y utilizarlos) !IMPORTANTE Reutilizar y tener presente antes de construir una pantalla o un componente



Directivas: Uso de NgOptimizedImage para asegurar que los logos de los clientes no afecten el LCP (Largest Contentful Paint).



Comunicación entre componentes: Uso de Signals (la nueva forma reactiva de Angular) para manejar el estado de los modales o formularios de contacto de manera eficiente.



