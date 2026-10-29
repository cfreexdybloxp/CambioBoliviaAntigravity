# PLAN Y REGISTRO DE PRUEBAS — CAMBIO BOLIVIA

Este documento registra los casos de prueba, criterios de validación matemática, pruebas unitarias y pruebas de interfaz planificadas y ejecutadas.

---

## 1. Casos de Prueba Matemáticos para Calculadoras y Conversor

### 1.1 Conversión de Divisas
- **Caso C1.1:** Conversión BOB a USD con tasa oficial (ej. 12,12 Bs por USD).
  - Entrada: `1.212,00 BOB` -> Resultado esperado: `100,00 USD`.
- **Caso C1.2:** Conversión inversa USD a BOB.
  - Entrada: `50,00 USD` -> Resultado esperado: `606,00 BOB`.
- **Caso C1.3:** Entrada de valor cero (`0`).
  - Resultado esperado: `0,00`, sin desbordamiento ni `NaN`.
- **Caso C1.4:** Valores negativos o cadenas alfanuméricas inválidas.
  - Resultado esperado: Bloqueo en UI y retorno de error controlado.
- **Caso C1.5:** Precisión con decimales periódicos.
  - Manejo de redondeo comercial bancario a 2 y 4 decimales.

### 1.2 Margen Bruto vs. Recargo (Markup)
Fórmulas normativas:
$$\text{Ganancia Bruta} = \text{Ingreso por Ventas} - \text{Costo de Ventas}$$
$$\text{Margen Bruto} = \frac{\text{Ganancia Bruta}}{\text{Ingreso por Ventas}} \times 100$$
$$\text{Recargo (Markup)} = \frac{\text{Ganancia Bruta}}{\text{Costo de Ventas}} \times 100$$

- **Caso C2.1:** Producto con Costo = 100 Bs y Precio de Venta = 150 Bs.
  - Ganancia Bruta = 50 Bs.
  - Margen Bruto = $50 / 150 = 33,33\%$.
  - Recargo (Markup) = $50 / 100 = 50,00\%$.
- **Caso C2.2:** Costo = 0 Bs o Precio = 0 Bs.
  - Control de división por cero; no debe arrojar `Infinity` ni romper la aplicación.
- **Caso C2.3:** Cálculo de precio de venta objetivo a partir de costo (100 Bs) y margen deseado (25%).
  - Precio objetivo = $\frac{\text{Costo}}{1 - \text{Margen}} = \frac{100}{1 - 0,25} = 133,33\text{ Bs}$.

### 1.3 Punto de Equilibrio
Fórmula:
$$\text{Punto de Equilibrio (unidades)} = \frac{\text{Costos Fijos Totales}}{\text{Precio de Venta Unitario} - \text{Costo Variable Unitario}}$$

- **Caso C3.1:** Costos Fijos = 10.000 Bs, Precio = 50 Bs/ud, Costo Variable = 30 Bs/ud.
  - Margen de contribución = 20 Bs.
  - Unidades de equilibrio = $10.000 / 20 = 500\text{ unidades}$.
  - Ventas en equilibrio = $500 \times 50 = 25.000\text{ Bs}$.
- **Caso C3.2:** Precio menor o igual al Costo Variable (ej. Precio = 20, Costo Variable = 30).
  - Alerta de inviabilidad comercial: margen de contribución negativo.

---

## 2. Registro de Ejecución de Pruebas

### 2.1 Ejecución Automatizada de Pruebas Unitarias y Matemáticas (Vitest)
- **Fecha de ejecución:** 2026-10-29
- **Comando:** `npm test` (`vitest run`)
- **Herramienta:** Vitest v2.1.9 en Node.js v24.21.0
- **Total de pruebas ejecutadas:** 22
- **Pruebas superadas:** 22 (100%)
- **Pruebas fallidas:** 0
- **Tiempo de ejecución de tests:** 40 ms

#### Detalle de Suites Validadas:
1. `financialMath.test.ts` (16 pruebas):
   - Redondeo seguro ante errores de punto flotante IEEE 754.
   - Manejo seguro de `NaN` e `Infinity`.
   - Formateo con símbolo `Bs` y separadores decimales estándar bolivianos.
   - Conversiones BOB-USD, USD-BOB y triangulaciones con pivote BOB.
   - Costo total de adquisición con fletes y desglose porcentual.
   - Margen Bruto vs. Recargo (Markup) con cálculo de precio inverso.
   - Punto de Equilibrio viable e inviable con emisión de alertas.
2. `customsAndCommunity.test.ts` (6 pruebas):
   - Estimación de Gravamen Arancelario (0% bienes de capital, 20% textiles nuevos).
   - Cálculo del IVA importación con alícuota efectiva del 14.94% sobre CIF + GA.
   - Bloqueo estricto e inmediato de importación de ropa usada según Decreto Supremo Nº 28761.
   - Validación de entradas ciudadanas, coherencia de precios de compra/venta y límites anti-spam.

---

### 2.2 Verificación de Compilación y Tipado Estático
- **Comando:** `npm run build` (`tsc -b && vite build`)
- **Resultado:** Exitoso (código de salida 0).
- **Módulos transformados:** 1.607 módulos.
- **Artefactos generados en `dist/`:**
  - `dist/index.html`: 1.42 kB (0.81 kB gzip)
  - `dist/assets/index-*.css`: 29.59 kB (5.84 kB gzip)
  - `dist/assets/index-*.js`: 442.83 kB (124.79 kB gzip con Leaflet y motor gráfico)
- **Advertencias críticas:** 0. Todos los tipos de datos TypeScript resueltos con verificación estricta.
