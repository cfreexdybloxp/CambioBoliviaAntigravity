# SEGURIDAD Y PERMISOS — CAMBIO BOLIVIA

Este documento define la política de seguridad, niveles de autorización para el agente y los controles de integridad aplicados en el proyecto.

---

## 1. Niveles de Autorización Operativa

- **Nivel A (Acciones Ordinarias Autónomas):**
  - Crear, editar y refactorizar archivos dentro del directorio de trabajo `c:\webCambioaora`.
  - Ejecutar suites de pruebas locales (`npm test`, `vitest`).
  - Ejecutar scripts de compilación local (`npm run build`, `vite build`).
  - Corregir fallos de tipeo, errores de lint y problemas de diseño responsive.
- **Nivel B (Evaluación Previa):**
  - Instalación de dependencias de producción y desarrollo (`npm install <pkg>`). Se analizan previamente el tamaño, la reputación de npm y la licencia permisiva (MIT/Apache 2.0).
- **Nivel C (Prohibidas sin Autorización Expresa del Propietario):**
  - Modificación o eliminación de archivos fuera del directorio `c:\webCambioaora`.
  - Ejecución de comandos de administrador o cambios en el registro de Windows.
  - Creación de cuentas comerciales, suscripciones o servicios de pago.
  - Publicación externa de dominios o despliegues en producción real.
  - Introducción de claves privadas o credenciales bancarias.
- **Nivel D (Acciones Terminantemente Prohibidas):**
  - Inserción de código malicioso, scripts de minería, ofuscación o captura oculta de datos.
  - Falsificación de fuentes oficiales o inventiva de datos de mercado.

---

## 2. Gestión de Secretos y Variables de Entorno

- La aplicación está diseñada para funcionar **sin secretos expuestos en el código**.
- No se suben archivos `.env` con credenciales reales a ningún repositorio.
- Se proporciona `.env.example` como plantilla para futuras integraciones opcionales que el propietario decida incorporar.

---

## 3. Seguridad en el Cliente (Frontend)

- **Sanitización de Entradas:** Todas las calculadoras comerciales y formularios de búsqueda cuentan con validación estricta de tipos (`zod` o validadores puros en TypeScript) para evitar inyecciones XSS o valores inválidos (`NaN`, infinitos, cadenas malformadas).
- **Privacidad del Usuario:** La plataforma no almacena números de cédula, cuentas bancarias ni tarjetas de crédito. Los cálculos comerciales se ejecutan 100% de manera local en la memoria del navegador del usuario.
- **Cabeceras de Seguridad para Despliegue:** Se incluye configuración recomendada de cabeceras HTTP (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) para cuando el propietario despliegue en Cloudflare Pages o Vercel.
