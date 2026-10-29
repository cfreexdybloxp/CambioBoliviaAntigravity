# Cambio Bolivia 🇧🇴

Plataforma web financiera, comercial y económica independiente y profesional para Bolivia.

## 🎯 Objetivo del Proyecto

Diseñada desde cero para brindar a ciudadanos, microempresarios, comerciantes y tomadores de decisiones información económica veraz, transparente y contrastada:
- **Cotizaciones y Divisas:** Tipos de cambio oficiales (BCB) y referencias comerciales con trazabilidad de fuente, fecha efectiva y cálculo de antigüedad.
- **Conversor Multi-divisa:** Conversiones bidireccionales de alta precisión matemática (BOB, USD, PEN, ARS, BRL, EUR, UFV).
- **Directorio de Casas de Cambio y Geolocalización:** Directorio contrastado con registros ASFI y mapa interactivo sin costo de API (OpenStreetMap + Leaflet).
- **Calculadoras Comerciales:** Costo de importación/compra, costo unitario, cálculo riguroso de margen bruto vs. recargo (*markup*), punto de equilibrio y comparador de proveedores.
- **Directorio de Proveedores y Precios Mayoristas Legales:** Enfoque en comercio formal y estricto cumplimiento normativo (Decreto Supremo Nº 28761 y Ley Nº 1990 que prohíben la prendería usada).
- **Centro Informativo y Guías Económicas:** Divulgación sobre tipos de cambio, inflación, conceptos arancelarios y buenas prácticas cambiarias.

---

## 💰 Política de Costos: Presupuesto Inicial 0 Bs

El proyecto opera bajo la premisa de costo cero (0 Bs):
- **Frontend / Hosting:** Compatible con despliegue estático gratuito (Cloudflare Pages, GitHub Pages o Vercel Free Tier).
- **Cartografía / Mapas:** OpenStreetMap con renderizado Leaflet sin requerimiento de tarjetas de crédito ni cuotas de pago.
- **APIs y Datos:** Consumo transparente de fuentes oficiales públicas, endpoints libres con caché en cliente (`localStorage`) y respaldos locales estructurados.
- **Iconografía y Tipografía:** Lucide Icons e Inter Font (licencias de código abierto).

---

## 🛠️ Stack Tecnológico

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Estilos y Diseño:** Tailwind CSS (tema profesional adaptado: Slate/Emerald/Amber con alto contraste y modo responsivo estricto)
- **Mapas:** Leaflet + React-Leaflet + OpenStreetMap tiles
- **Iconos:** Lucide React
- **Pruebas:** Vitest + React Testing Library (con validación matemática estricta y pruebas unitarias de divisas y calculadoras)

---

## 🚀 Inicio Rápido en Entorno Local

### Prerrequisitos
- Node.js (versión 18 o superior recomendada, verificado en v24)
- npm (versión 9 o superior)

### Instalación y Ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar suite de pruebas unitarias y matemáticas
npm test

# 3. Iniciar servidor de desarrollo local
npm run dev
```

La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

---

## 📚 Documentación de Memoria Operativa

Para una consulta detallada de arquitectura, decisiones y mantenimiento, consulte los documentos en la raíz del repositorio:
- [PLAN_DE_TRABAJO.md](file:///c:/webCambioaora/PLAN_DE_TRABAJO.md): Fases, objetivos y criterios de aceptación.
- [ESTADO_DEL_PROYECTO.md](file:///c:/webCambioaora/ESTADO_DEL_PROYECTO.md): Estado actual de avance y verificación.
- [ARQUITECTURA.md](file:///c:/webCambioaora/ARQUITECTURA.md): Diagrama estructural y flujo de datos.
- [DECISIONES_TECNICAS.md](file:///c:/webCambioaora/DECISIONES_TECNICAS.md): Fundamento de las decisiones tomadas.
- [FUENTES_DE_DATOS.md](file:///c:/webCambioaora/FUENTES_DE_DATOS.md): Registro exhaustivo de fuentes (BCB, ASFI, Aduana).
- [SEGURIDAD_Y_PERMISOS.md](file:///c:/webCambioaora/SEGURIDAD_Y_PERMISOS.md): Auditoría de seguridad y políticas de datos.
- [COSTOS_Y_LIMITES.md](file:///c:/webCambioaora/COSTOS_Y_LIMITES.md): Análisis de cuotas gratuitas y sustentabilidad 0 Bs.
- [PRUEBAS.md](file:///c:/webCambioaora/PRUEBAS.md): Casos de prueba ejecutados y resultados matemáticos.
- [MANUAL_DEL_PROPIETARIO.md](file:///c:/webCambioaora/MANUAL_DEL_PROPIETARIO.md): Guía de despliegue, actualización de datos y mantenimiento autónomo.
- [CHANGELOG.md](file:///c:/webCambioaora/CHANGELOG.md): Historial cronológico de cambios.
