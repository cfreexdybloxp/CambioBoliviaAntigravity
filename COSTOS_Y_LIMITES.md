# COSTOS Y LÍMITES — CAMBIO BOLIVIA

Este documento audita los servicios utilizados, sus cuotas gratuitas comprobadas y certifica el cumplimiento del presupuesto inicial de **0 Bs**.

---

## 1. Tabla de Costos Operativos

| Componente | Proveedor / Tecnología | Plan / Licencia | Costo Inicial | Costo Mensual | Requiere Tarjeta |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Framework & UI** | React 19 + Tailwind CSS | MIT (Open Source) | 0 Bs | 0 Bs | No |
| **Herramientas de Build** | Vite + TypeScript | MIT (Open Source) | 0 Bs | 0 Bs | No |
| **Iconografía** | Lucide React | ISC / MIT | 0 Bs | 0 Bs | No |
| **Mapas & Geodatos** | Leaflet + OpenStreetMap | ODbL / BSD-2 | 0 Bs | 0 Bs | No |
| **Pruebas Automatizadas**| Vitest | MIT | 0 Bs | 0 Bs | No |
| **Alojamiento (Recomendado)**| Cloudflare Pages o GitHub Pages | Plan Gratuito (Free Tier) | 0 Bs | 0 Bs | No |
| **Certificado SSL / HTTPS** | Provisto por Cloudflare/GitHub | Automático Let's Encrypt | 0 Bs | 0 Bs | No |
| **Dominio Personalizado** | Subdominio gratuito (`.pages.dev` o `.github.io`)| Incluido | 0 Bs | 0 Bs | No |

**Total de Costo Inicial:** **0,00 Bs.**  
**Total de Costo de Mantenimiento:** **0,00 Bs.**

---

## 2. Cuotas y Límites de Servicios Gratuitos

### Cloudflare Pages (Opción de Hosting Recomendada)
- **Ancho de banda mensual:** Ilimitado en el plan gratuito.
- **Compilaciones simultáneas:** 1 compilación activa, 500 compilaciones por mes (más que suficiente para actualizaciones de producción).
- **Sitios web activos:** Ilimitados.
- **Riesgo de cobro imprevisto:** Nulo (Cloudflare no factura automáticamente a cuentas gratuitas sin tarjeta añadida).

### GitHub Pages (Opción Alternativa)
- **Almacenamiento:** Hasta 1 GB por repositorio.
- **Límite de ancho de banda:** 100 GB por mes.
- **Riesgo de cobro imprevisto:** Nulo.

### Servidores de Teselas de OpenStreetMap (Tile Server)
- **Límite:** Uso justo (*Fair Use Policy*). Prohíbe descargas masivas automatizadas de mapa completo (scraping de teselas).
- **Cumplimiento:** Nuestra implementación utiliza Leaflet estándar con visualización bajo demanda del usuario, respetando cabeceras y caché HTTP.

---

## 3. Plan de Contingencia ante Posibles Cambios de Políticas Externas
Si en el futuro OpenStreetMap limitara el acceso a teselas públicas, se puede migrar inmediatamente a proveedores de teselas con capas gratuitas de hasta 50.000 cargas mensuales sin costo (ej. CartoDB Positron o Stamen via Stadia Maps con capa libre), o conmutar al modo lista estructurada sin mapa visual para conexiones de bajo ancho de banda.
