# HISTORIAL DE CAMBIOS (CHANGELOG) — CAMBIO BOLIVIA

Todas las modificaciones notables realizadas en este proyecto serán registradas cronológicamente en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [0.4.0] — 2026-10-29

### Añadido
- **Navegación GPS de un Clic para Casas de Cambio:**
  - Botón "Abrir en GPS / Maps" directo en cada ficha del directorio ASFI, enlazando las coordenadas verificadas con Google Maps / OpenStreetMap.
- **Formulario y Modal de Registro para Proveedores Formales:**
  - Interfaz para que empresas bolivianas con NIT y registro SEPREC soliciten su incorporación al directorio.
  - Declaración jurada obligatoria con verificación estricta de exclusión de ropa usada (Decreto Supremo Nº 28761).
- **Nuevas Guías Económicas y Normativas Bolivianas:**
  - Guía explicativa: *Régimen Tributario Simplificado (RTS) vs. Régimen General (SIN)* con topes de capital (D.S. 3698) y formalización.
  - Guía práctica: *Comercio en Ciudades Fronterizas (Desaguadero, Pisiga, Yacuiba y Puerto Quijarro)* con análisis de monedas y régimen vecinal TVF.
- **Seguridad en Alojamiento y Despliegue:**
  - Creación de `public/_headers` con cabeceras de protección (CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff) para Cloudflare Pages.
  - Creación de `vercel.json` con reescrituras SPA y cabeceras de seguridad.
  - Workflow de CI/CD automatizado en `.github/workflows/ci-and-deploy.yml` para validación gratuita de pruebas antes de cada despliegue.
- **Optimización de Metadatos y Redes Sociales:**
  - Etiquetas Open Graph y Twitter Cards añadidas en `index.html`.

---

## [0.3.0] — 2026-10-29

### Añadido
- **Calculadora de Indexación a la UFV y Poder Adquisitivo ([UfvIndexationCalculator](file:///c:/webCambioaora/src/components/calculators/UfvIndexationCalculator.tsx)):**
  - Actualización formal de montos en Bolivianos por la Unidad de Fomento de Vivienda del Banco Central de Bolivia (Decreto Supremo Nº 26390).
  - Serie histórica anual desde 2001 hasta 2026 y cálculo de pérdida relativa de poder adquisitivo.
- **Exportador de Datos Abiertos ([OpenDataExporter](file:///c:/webCambioaora/src/components/common/OpenDataExporter.tsx)):**
  - Descarga instantánea de cotizaciones oficiales en CSV y JSON.
  - Descarga del directorio de casas de cambio supervisadas por ASFI en formato CSV para investigadores y pymes.
- **Soporte PWA (Progressive Web App):**
  - Configuración de `public/manifest.json` y metadatos en `index.html` para acceso e instalación offline en dispositivos móviles y de escritorio.
- **Suite de Pruebas Ampliada:**
  - 4 pruebas automatizadas adicionales en `ufvMath.test.ts` (total: 26 pruebas pasando al 100%).

---

## [0.2.0] — 2026-10-29

### Añadido
- **Módulo Tributario y Arancelario Aduanero ([CustomsTariffCalculator](file:///c:/webCambioaora/src/components/calculators/CustomsTariffCalculator.tsx)):**
  - Estimación formal de Gravamen Arancelario (GA) de 0% a 40% según partidas de la Ley General de Aduanas (Ley Nº 1990).
  - Cálculo automático del IVA importación efectivo (14.94% sobre CIF + GA) y explicación de compensación de Crédito Fiscal en el Formulario 200 del SIN.
  - Bloqueo preventivo de cálculo para ropa usada con citación del Decreto Supremo Nº 28761.
- **Generador de Proforma Comercial y Exportación a PDF/Impresión ([CommercialProformaSheet](file:///c:/webCambioaora/src/components/calculators/CommercialProformaSheet.tsx)):**
  - Generación de hojas de liquidación y proformas formales optimizadas para impresión en papel A4 (`@media print`) o exportación directa a PDF.
- **Gráfico de Evolución de Cotizaciones ([HistoricalRatesChart](file:///c:/webCambioaora/src/components/currency/HistoricalRatesChart.tsx)):**
  - Componente vectorial SVG puro y responsivo sin librerías pesadas para comparar la serie oficial del BCB frente al promedio comercial.
- **Tabla Comparativa y Spread Cambiario ([RateComparisonTable](file:///c:/webCambioaora/src/components/currency/RateComparisonTable.tsx)):**
  - Matriz comparativa entre casas de cambio supervisadas por ASFI, con cálculo de diferencial (*spread*) y discrepancia numérica frente a la tasa oficial.
- **Sub-sistema de Reportes Comunitarios y Moderación ([CommunityRatesPanel](file:///c:/webCambioaora/src/components/currency/CommunityRatesPanel.tsx)):**
  - Formulario ciudadano con limitación de frecuencia anti-spam y prevención de duplicados en `localStorage`.
  - Panel administrativo de moderación local con estados: `PENDIENTE_REVISION`, `VERIFICADO_PUBLICADO` y `RECHAZADO`.
- **Modal de Transparencia, Metodología y Privacidad ([LegalDisclaimerModal](file:///c:/webCambioaora/src/components/common/LegalDisclaimerModal.tsx)):**
  - Secciones accesibles desde el pie de página para auditar metodología, política de cero rastreo de datos y compromiso normativo.
- **Optimización para Crecimiento y SEO:**
  - Archivos `public/robots.txt` y `public/sitemap.xml` añadidos.
- **Expansión de la Suite de Pruebas:**
  - 6 nuevas pruebas automatizadas para aduana y validación ciudadana (total: 22 pruebas superadas al 100%).

---

## [0.1.0] — 2026-10-29

### Añadido
- **Fase 0 y Fase 1: Gobernanza y Memoria Operativa:**
  - Verificación del entorno de trabajo local en `c:\webCambioaora` (confirmado limpio y aislado).
  - Creación del sistema de memoria operativa con 11 documentos reglamentarios:
    - `README.md`, `PLAN_DE_TRABAJO.md`, `ESTADO_DEL_PROYECTO.md`, `DECISIONES_TECNICAS.md`, `FUENTES_DE_DATOS.md`, `SEGURIDAD_Y_PERMISOS.md`, `COSTOS_Y_LIMITES.md`, `PRUEBAS.md`, `CHANGELOG.md`, `MANUAL_DEL_PROPIETARIO.md`, `ARQUITECTURA.md`.
- **Fase 2: Arquitectura y Frontend:**
  - Configuración de React 18/19, TypeScript, Vite, Tailwind CSS y Leaflet.
  - Diseño responsivo adaptado a dispositivos móviles y pantallas de escritorio.
  - Shell de navegación (`Navbar`, `Footer`, `DisclaimerBanner`).
- **Fase 3: Módulo de Divisas y Conversor:**
  - Datos oficiales verificados del Banco Central de Bolivia (BCB) y pizarras comerciales.
  - Conversor interactivo bidireccional con cálculo de antigüedad y trazabilidad documental.
  - Monedas soportadas: BOB, USD, EUR, PEN, BRL, ARS, CLP, UFV.
- **Fase 4: Calculadoras Comerciales:**
  - Calculadora de Costo Total de Adquisición e Importación (*Landed Cost*) y Costo Unitario.
  - Calculadora de Margen Bruto vs. Recargo (*Markup*) con advertencias pedagógicas.
  - Calculadora de Punto de Equilibrio (*Break-Even Point*) con análisis de viabilidad comercial.
  - Comparador de costo real de adquisición entre proveedores.
- **Fase 5: Directorio de Casas de Cambio y Mapa Interactivo:**
  - Integración de Leaflet + OpenStreetMap sin costo de API (0 Bs).
  - Directorio curado con números de licencia ASFI en La Paz, Santa Cruz, Cochabamba, Oruro y Tarija.
  - Filtros dinámicos por departamento y buscador en tiempo real.
- **Fase 6: Proveedores Mayoristas y Cumplimiento Normativo:**
  - Directorio de proveedores formales en confección textil nueva, calzado y manufactura.
  - Banner de advertencia obligatoria del Decreto Supremo Nº 28761 (prohibición terminante de ropa usada).
- **Fase 7: Guías y Glosario Económico:**
  - Artículos educativos sobre diferencial cambiario, fijación de precios y normativa aduanera.
  - Glosario de términos financieros bolivianos (UFV, TCO, ASFI, etc.).
- **Fase 8: Suite de Pruebas y Verificación:**
  - 16 pruebas unitarias matemáticas automatizadas pasando al 100% en Vitest.
  - Compilación de producción (`dist/`) completada exitosamente sin errores de TypeScript.
