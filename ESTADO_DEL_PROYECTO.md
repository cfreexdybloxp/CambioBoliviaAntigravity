# ESTADO DEL PROYECTO — CAMBIO BOLIVIA

**Última actualización:** Noviembre 2026  
**Fase actual:** Todas las fases nucleares completadas (Fase 0 a Fase 9).  
**Estado global:** 🟢 **PROYECTO FINALIZADO Y OPERATIVO AL 100%** (Listo para publicación).

---

## 📊 Tablero de Control de Funcionalidades

| Módulo / Componente | Estado | Verificación | Notas |
| :--- | :--- | :--- | :--- |
| **Fase 0: Entorno y Seguridad** | ✅ COMPLETADO | Verificado | Node v24, npm v11, TypeScript estricto, 0 Bs de coste. |
| **Fase 1: Fuentes y Trazabilidad** | ✅ COMPLETADO | Verificado | Fuentes primarias citadas (BCB, ASFI, ANB), sin datos inventados. |
| **Fase 2: Arquitectura y Modo Día/Noche** | ✅ COMPLETADO | Verificado | Botón Día/Noche en Navbar con persistencia en localStorage y paleta Tailwind completa. |
| **Fase 3: Módulo de Divisas y Conversor** | ✅ COMPLETADO | Verificado | Conversor bidireccional, pizarra de cotizaciones BCB, tabla de spread y reportes ciudadanos moderados. |
| **Fase 4: 7 Calculadoras Comerciales** | ✅ COMPLETADO | Verificado | 1. Costo Unitario, 2. Margen vs Markup, 3. Punto de Equilibrio, 4. Aranceles e IVA Aduana, 5. Indexación UFV (DS 26390), 6. Comparador de Proveedores, 7. Proforma imprimible/PDF. |
| **Fase 5: Casas de Cambio y Mapa Interactivo** | ✅ COMPLETADO | Verificado | Mapa OpenStreetMap (Leaflet, 0 coste), filtro departamental y navegación GPS a Google Maps/Waze. |
| **Fase 6: Directorio de Proveedores Lícitos** | ✅ COMPLETADO | Verificado | Filtro por categoría, alerta legal DS 28761 (prohibición de ropa usada) y formulario de registro formal con declaración jurada. |
| **Fase 7: Guías Económicas y Glosario** | ✅ COMPLETADO | Verificado | 5 guías prácticas bolivianas (TCO, Margen, DS 28761, RTS vs Régimen General, Comercio Fronterizo). |
| **Fase 8: Suite de Pruebas Automatizadas** | ✅ COMPLETADO | Verificado | **35 tests automatizados pasando** en Vitest (0 fallos). Build de producción optimizado (0 errores). |
| **Fase 9: Exportación y Datos Abiertos** | ✅ COMPLETADO | Verificado | Exportador a CSV y JSON en memoria del navegador (sin servidores externos). |

---

## 🎯 ¿Qué hay que hacer ahora? (Opciones para el propietario)

1. **Probar la aplicación en el navegador localmente**:
   - Ejecuta `npm run dev` en la terminal (o si ya está corriendo, abre en tu navegador `http://localhost:5173`).
   - Prueba cambiar de **Modo Día a Modo Noche** usando el botón de sol/luna en la esquina superior derecha.
   - Prueba las 7 calculadoras, el mapa de casas de cambio y el conversor.

2. **Publicar la web en internet gratis (0 Bs)**:
   - Ya están listos `vercel.json`, `_headers` para Cloudflare Pages y el workflow de GitHub Actions (`.github/workflows/ci-and-deploy.yml`).
   - Puedes subir el repositorio a GitHub y conectarlo en 1 clic a [Vercel](https://vercel.com) o [Cloudflare Pages](https://pages.cloudflare.com) a costo 0 Bs.

3. **Empaquetar para producción**:
   - El comando `npm run build` genera la carpeta `dist/`, lista para alojarse en cualquier servidor estático.
