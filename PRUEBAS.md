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
- **Total de pruebas ejecutadas:** 16
- **Pruebas superadas:** 16 (100%)
- **Pruebas fallidas:** 0
- **Tiempo de ejecución de tests:** 34 ms

#### Detalle de Suites Validadas:
1. `roundCurrency & formatCurrency`:
   - Redondeo seguro ante errores de punto flotante IEEE 754 (0.1 + 0.2 = 0.3).
   - Manejo seguro de `NaN` e `Infinity`.
   - Formateo con símbolo `Bs` y separadores decimales estándar bolivianos (`1.234,56`).
2. `convertAmount` (Conversor de Divisas):
   - BOB a USD dividiendo entre `sellRate` oficial (1.212 Bs -> 100 USD).
   - USD a BOB multiplicando por `buyRate` oficial (50 USD -> 600 Bs).
   - Misma moneda (BOB a BOB) con tasa 1.0.
   - Triangulación documentada entre monedas extranjeras (EUR a USD con BOB pivote).
   - Control de cantidades nulas o negativas.
3. `calculateImportCost` (Costos Comerciales y de Importación):
   - Costo total de adquisición con flete, embalaje, aduana y comisiones.
   - Cálculo exacto de costo unitario por producto.
   - Desglose porcentual de incidencia de costos.
   - Control de divisiones por cero en lotes vacíos.
4. `calculateMarginAndMarkup` (Margen Bruto vs. Recargo):
   - Caso base 100 Bs costo / 150 Bs venta -> 50 Bs ganancia, 33.33% margen bruto y 50.00% markup.
   - Cálculo inverso de precio a partir de margen objetivo.
   - Cálculo inverso de precio a partir de recargo objetivo.
   - Prevención de márgenes matemáticamente imposibles (>= 100%).
5. `calculateBreakEven` (Punto de Equilibrio):
   - Caso viable: Costos fijos 10.000 Bs, Precio 50 Bs, Costo variable 30 Bs -> 500 unidades y 25.000 Bs.
   - Caso inviable: Precio inferior a costo variable con emisión de alerta pedagógica.

---

### 2.2 Verificación de Compilación y Tipado Estático
- **Comando:** `npm run build` (`tsc -b && vite build`)
- **Resultado:** Exitoso (código de salida 0).
- **Módulos transformados:** 1.599 módulos.
- **Artefactos generados en `dist/`:**
  - `dist/index.html`: 1.42 kB (0.81 kB gzip)
  - `dist/assets/index-*.css`: 25.28 kB (5.27 kB gzip)
  - `dist/assets/index-*.js`: 394.80 kB (114.23 kB gzip)
- **Advertencias críticas:** 0. Todos los tipos de datos TypeScript resueltos con verificación estricta.
