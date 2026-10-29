# DECISIONES TÉCNICAS — CAMBIO BOLIVIA

Este registro documenta las decisiones de ingeniería, arquitectura y diseño, detallando el problema analizado, alternativas consideradas, razones de elección y trade-offs.

---

### Decisión 1: Arquitectura Frontend Single Page Application (SPA) Estática con React 19 + TypeScript + Vite
- **Problema:** Se requiere una plataforma web con alta velocidad de respuesta, interactividad fluida para calculadoras y mapas, costo operativo de 0 Bs y máxima facilidad de mantenimiento para el propietario.
- **Alternativas evaluadas:**
  1. *Fullstack Node.js / Express con base de datos PostgreSQL hospedada:* Requiere servidores en ejecución continua (Render, Railway, Fly.io) que en planes gratuitos se suspenden (cold starts de 30-60 segundos), introducen límites mensuales de horas y riesgo de cobros imprevistos.
  2. *Next.js con SSR:* Requiere infraestructura de runtime compatible o configuración compleja de exportación estática con mayor peso y complejidad de dependencias.
  3. *SPA Estática con React + Vite + TypeScript:* Produce un paquete optimizado de HTML/CSS/JS puro (`dist/`) que puede alojarse gratuitamente en Cloudflare Pages, GitHub Pages o Vercel con CDN mundial, disponibilidad del 99.99%, carga instantánea, 0 riesgo de costos y mantenimiento trivial.
- **Decisión:** Opción 3 (React 19 + Vite + TypeScript).
- **Riesgo y mitigación:** Los datos dinámicos residen en el cliente y en capas de servicios asíncronos con almacenamiento local seguro (`localStorage`), permitiendo sincronización programada o manual sin requerir un servidor dedicado permanente.

---

### Decisión 2: Proveedor de Mapas — OpenStreetMap + Leaflet vs. Google Maps / Mapbox
- **Problema:** Visualizar geográficamente las casas de cambio autorizadas en La Paz, Santa Cruz, Cochabamba y otras capitales de Bolivia sin infringir la restricción de presupuesto (0 Bs).
- **Alternativas evaluadas:**
  1. *Google Maps JavaScript API:* Requiere registrar una tarjeta de crédito en Google Cloud, expone cuotas con cobros automáticos si se superan los créditos iniciales y exige proteger claves de API complejas con restricciones de dominio.
  2. *Mapbox GL JS:* Requiere cuenta, tarjeta de crédito y token privado con límites de cargas mensuales.
  3. *Leaflet + OpenStreetMap (OSM):* 100% de código abierto, no requiere tarjeta de crédito, sin claves de API, azulejos (*tiles*) gratuitos y comunitarios, peso ligero (<40 KB gzip) y soporte responsive impecable en móviles.
- **Decisión:** Opción 3 (Leaflet + OpenStreetMap).
- **Riesgo y mitigación:** Respetar la política de uso justo de los servidores de teselas de OpenStreetMap mediante cabeceras estándar de User-Agent y caché de navegador.

---

### Decisión 3: Manejo Matemático Financiero y Prevención de Errores de Punto Flotante
- **Problema:** JavaScript nativo tiene problemas con aritmética de coma flotante IEEE 754 (ej. `0.1 + 0.2 = 0.30000000000000004`), lo cual es inaceptable para cálculos de divisas y precios unitarios comerciales.
- **Alternativas evaluadas:**
  1. *Operar con `Number` estándar sin validación:* Inadmisible para precisión financiera.
  2. *Dependencias pesadas externas:* Aumentan el peso del paquete innecesariamente.
  3. *Módulo de precisión financiera propio con redondeo seguro por enteros (cents/micros) y `Intl.NumberFormat`:* Máxima ligereza, cero dependencias adicionales, control estricto de divisiones por cero y redondeo comercial estándar a 2 o 4 decimales según la divisa.
- **Decisión:** Opción 3 (Implementación de utilidades matemáticas puras tipadas y verificadas con suite de pruebas unitarias).

---

### Decisión 4: Diferenciación Estricta de Cotizaciones Oficiales vs. Comerciales
- **Problema:** En el mercado boliviano coexisten el Tipo de Cambio Oficial regulado por el BCB y cotizaciones comerciales o de frontera. Mezclarlos confunde al usuario y vulnera la veracidad de la información.
- **Decisión:** Modelo de datos tipado que clasifica explícitamente:
  - `OFICIAL_BCB`: Cotización fijada y publicada por el Banco Central de Bolivia.
  - `REFERENCIAL_COMERCIAL`: Cotización observada en transacciones comerciales y casas de cambio autorizadas.
  - `PARALELO_INFORMATIVO`: Reporte promedio de mercado informal con advertencia explícita de volatilidad y falta de respaldo oficial.
  - Cada registro incluye campos obligatorios: `sourceName`, `sourceUrl`, `effectiveDate`, `retrievedAt`, `stalenessWarning`.

---

### Decisión 5: Cumplimiento Normativo Aduanero Boliviano en el Módulo de Comercio
- **Problema:** En Bolivia la importación y venta de ropa usada ("prendería usada") está prohibida por ley, pero es una búsqueda frecuente de comerciantes novatos.
- **Decisión:** Implementar una política editorial y de producto que prohíba explícitamente la inclusión de proveedores de ropa usada o herramientas de costeo para mercancías ilícitas. En su lugar, se incluye una sección pedagógica que cita el Decreto Supremo Nº 28761 y la Ley General de Aduanas Nº 1990, orientando a los emprendedores hacia la confección nacional, textiles nuevos e importación formal regulada.
