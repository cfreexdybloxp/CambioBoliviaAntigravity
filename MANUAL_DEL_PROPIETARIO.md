# MANUAL DEL PROPIETARIO — CAMBIO BOLIVIA

Este manual está redactado para que usted, como propietario del proyecto, pueda instalar, probar, mantener, actualizar y desplegar la plataforma **Cambio Bolivia** sin depender permanentemente del agente de desarrollo.

---

## 1. Estructura General del Proyecto

```
c:\webCambioaora\
├── src\
│   ├── components\        # Componentes de la interfaz de usuario
│   ├── data\              # Datos curados (cotizaciones, casas de cambio, proveedores, guías)
│   ├── types\             # Definiciones TypeScript de datos y modelos
│   ├── utils\             # Lógica matemática financiera pura y formateo
│   ├── tests\             # Pruebas unitarias automatizadas
│   ├── App.tsx            # Componente raíz y navegación
│   └── main.tsx           # Punto de entrada de la aplicación
├── public\                # Archivos estáticos (favicons, manifest)
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración del empaquetador
├── tailwind.config.js     # Configuración de estilos y tema visual
└── *.md                   # Memoria operativa y registros técnicos
```

---

## 2. Instrucciones de Ejecución Local

### Paso 1: Abrir la terminal en la carpeta del proyecto
```bash
cd c:\webCambioaora
```

### Paso 2: Instalar dependencias (solo la primera vez)
```bash
npm install
```

### Paso 3: Ejecutar pruebas unitarias
```bash
npm test
```
Esto correrá la suite de Vitest validando todas las fórmulas matemáticas financieras, conversiones de divisas y márgenes comerciales.

### Paso 4: Iniciar el servidor local para ver la web
```bash
npm run dev
```
Abra su navegador en la dirección que indica la terminal (usualmente `http://localhost:5173`).

---

## 3. Cómo Actualizar las Cotizaciones Manualmente

Las cotizaciones oficiales y comerciales están centralizadas en:
`src/data/officialRates.ts`

Para actualizar una cotización:
1. Abra el archivo `src/data/officialRates.ts` con cualquier editor de texto o IDE.
2. Localice la moneda o par cambiario (por ejemplo `USD` o `EUR`).
3. Modifique los campos:
   - `buyRate`: Precio de compra.
   - `sellRate`: Precio de venta.
   - `effectiveDate`: Fecha oficial de vigencia (formato `YYYY-MM-DD`).
   - `retrievedAt`: Fecha y hora de su consulta.
4. Guarde el archivo. Si el servidor local está corriendo, la página se actualizará automáticamente sin recargar.

---

## 4. Cómo Desplegar en Internet Gratis (Costo 0 Bs)

La aplicación genera una carpeta de archivos estáticos puros (`dist/`) lista para ser alojada en plataformas con nivel gratuito permanente y protección SSL:

### Opción A: Cloudflare Pages (Recomendada — Máxima velocidad y 0 costos)
1. Cree una cuenta gratuita en [cloudflare.com](https://www.cloudflare.com) (no pide tarjeta de crédito).
2. Conecte su repositorio de GitHub o suba directamente la carpeta `dist/` resultante de ejecutar `npm run build`.
3. Configuración de compilación:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Su sitio estará en línea en segundos bajo un subdominio seguro tipo `cambiobolivia.pages.dev`.

### Opción B: Vercel o Netlify
1. Conecte el repositorio en Vercel o Netlify.
2. Detectará automáticamente Vite y React.
3. Despliegue con un solo clic.

---

## 5. Mantenimiento y Extensibilidad

- **Añadir nuevas casas de cambio:** Modifique `src/data/exchangeHouses.ts` añadiendo la ficha con coordenadas y razón social autorizada por ASFI.
- **Añadir nuevos proveedores:** Modifique `src/data/suppliers.ts` verificando que cumplan la normativa boliviana (estricta exclusión de ropa usada según DS 28761).
- **Añadir nuevas guías o artículos:** Modifique `src/data/educationalGuides.ts`.
