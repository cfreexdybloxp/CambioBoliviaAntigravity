# PLAN DE TRABAJO — CAMBIO BOLIVIA

Este plan define las fases, tareas, prioridades, dependencias y criterios de aceptación para el desarrollo autónomo y riguroso de Cambio Bolivia.

---

## Estructura de Fases

### Fase 0 — Confirmación del Entorno, Seguridad e Higiene
- [x] Confirmación de carpeta exclusiva `c:\webCambioaora` (comprobada vacía, sin solapamiento de proyectos previos).
- [x] Verificación de entorno de ejecución local (Node.js v24, npm v11, Git v2.52).
- [x] Creación del sistema de memoria operativa y documentación viva (11 archivos reglamentarios).
- **Criterio de finalización:** Entorno verificado, aislado, con políticas de seguridad Nivel A/B/C activas y sin riesgo de fugas de datos.

### Fase 1 — Investigación, Fuentes Oficiales y Arquitectura
- [x] Investigación de fuentes oficiales de Bolivia: BCB, ASFI, Aduana Nacional.
- [x] Verificación de normativas comerciales clave (DS Nº 28761 de prohibición de ropa usada, Ley Nº 1990 de Aduanas).
- [x] Modelado de datos de divisas (separación estricta de Tipo de Cambio Oficial vs. Referencial Comercial, compra/venta, fecha efectiva y antigüedad).
- [x] Elección arquitectónica: SPA moderna estática con React 19 + TypeScript + Vite + Tailwind CSS + Leaflet OSM (0 Bs, sin costos de servidor ni tarjetas de crédito).
- **Criterio de finalización:** Documentos `ARQUITECTURA.md`, `FUENTES_DE_DATOS.md`, `DECISIONES_TECNICAS.md` y `COSTOS_Y_LIMITES.md` redactados con evidencia real.

### Fase 2 — Sistema de Diseño, Identidad y Maquetación Base
- [ ] Definición del Design System (paleta corporativa financiera: Slate 900, Emerald 600, Amber 500, contrastes WCAG AA/AAA).
- [ ] Configuración de Vite + TypeScript + Tailwind CSS con tipografía Inter y layout responsivo móvil primero (teléfonos modestos a pantallas 4K).
- [ ] Creación del Shell de Navegación: Encabezado institucional, selector de pestañas, indicador global de estado de datos y pie de página con descargos legales.
- **Criterio de finalización:** Interfaz renderizada, accesible, responsive y con feedback visual claro de carga y error.

### Fase 3 — Módulo de Divisas y Conversor de Alta Precisión
- [ ] Repositorio de tipos de cambio oficiales y comerciales con metadatos completos (fuente, fecha de publicación, fecha de consulta, estado de verificación).
- [ ] Conversor interactivo bidireccional (BOB, USD, PEN, ARS, BRL, EUR, UFV).
- [ ] Indicador explícito de antigüedad de la cotización con advertencia cuando supere umbrales razonables.
- [ ] Manejo de precisión decimal financiera evitando conversiones encadenadas opacas y ceros silenciosos.
- **Criterio de finalización:** Conversiones verificadas con pruebas unitarias matemáticas automatizadas en Vitest.

### Fase 4 — Calculadoras Comerciales y de Negocio
- [ ] Calculadora de Costo Total de Adquisición (precio compra, flete, embalaje, comisiones, multimoneda con conversión documentada).
- [ ] Calculadora de Costo Unitario (protección contra división por cero, desglose de lotes).
- [ ] Calculadora de Precio de Venta, Ganancia Bruta, Margen Bruto vs. Recargo (Markup).
- [ ] Calculadora de Punto de Equilibrio (Costos fijos, precio unitario, costo variable unitario, validación de viabilidad).
- [ ] Comparador multi-proveedor por costo unitario comparable.
- **Criterio de finalización:** Suite de pruebas matemáticas ejecutada con casos extremos (cero, valores grandes, decimales, monedas cruzadas).

### Fase 5 — Directorio de Casas de Cambio y Cartografía (0 Bs)
- [ ] Directorio estructurado de casas de cambio autorizadas con datos verificables y atribución a registros públicos de ASFI.
- [ ] Diferenciación clara entre precio de compra (establecimiento compra) y precio de venta (establecimiento vende).
- [ ] Componente de mapa interactivo con OpenStreetMap y Leaflet (sin API keys ni riesgo de cobros).
- [ ] Filtros por departamento (La Paz, Santa Cruz, Cochabamba, Oruro, Tarija, etc.) y vista alternativa en lista para conexiones lentas.
- **Criterio de finalización:** Directorio operativo con advertencia de vigencia y trazabilidad de licencia.

### Fase 6 — Directorio de Proveedores Mayoristas y Cumplimiento Normativo
- [ ] Estructura de directorio de proveedores formales y legales (textiles nuevos, calzado nacional, insumos de confección, ferretería, tecnología).
- [ ] Mensaje educativo y advertencia de cumplimiento del Decreto Supremo Nº 28761 (prohibición terminante de importación y venta de ropa usada).
- [ ] Formulario local de simulación de alta de proveedores con validación de requisitos formales (NIT, dirección física, productos lícitos).
- **Criterio de finalización:** Sección funcional con advertencias regulatorias claras y sin datos inventados no etiquetados.

### Fase 7 — Centro de Guías y Contenido Económico Boliviano
- [ ] Guías prácticas: "¿Cómo entender el tipo de cambio oficial vs. paralelo?", "Margen vs. Recargo en tu negocio", "Pasos legales para importar mercancías menores".
- [ ] Glosario financiero boliviano (UFV, TCO, Divisas de frontera, ASFI, BCB, Aduana Nacional).
- **Criterio de finalización:** Artículos informativos con lenguaje claro, citas a fuentes y valor pedagógico real.

### Fase 8 — Verificación Integral, Pruebas y Auditoría
- [ ] Pruebas unitarias de lógica y cálculo (100% pasando en Vitest).
- [ ] Auditoría de accesibilidad (contraste, etiquetas aria, navegación por teclado).
- [ ] Comprobación del bundle estático (`npm run build`).
- **Criterio de finalización:** Cero advertencias críticas de compilación, 100% de tests pasando, reporte en `PRUEBAS.md`.

### Fase 9 — Documentación Final y Manual del Propietario
- [ ] Guía paso a paso para despliegue gratuito en Cloudflare Pages / Vercel / GitHub Pages.
- [ ] Instrucciones de actualización manual y mantenimiento de datos.
- [ ] Cierre y reporte final para el propietario.
