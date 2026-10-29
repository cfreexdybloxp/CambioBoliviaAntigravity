# HISTORIAL DE CAMBIOS (CHANGELOG) — CAMBIO BOLIVIA

Todas las modificaciones notables realizadas en este proyecto serán registradas cronológicamente en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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
