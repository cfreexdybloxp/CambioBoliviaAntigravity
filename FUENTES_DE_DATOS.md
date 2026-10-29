# FUENTES DE DATOS — CAMBIO BOLIVIA

Este documento registra la investigación de fuentes de datos primarias, oficiales y referenciales para la plataforma Cambio Bolivia, especificando condiciones de uso, métodos de consulta, periodicidad y limitaciones.

---

## 1. Banco Central de Bolivia (BCB)

- **Institución:** Banco Central de Bolivia.
- **Enlace oficial:** [https://www.bcb.gob.bo/](https://www.bcb.gob.bo/)
- **Sección de tipos de cambio:** `https://www.bcb.gob.bo/?q=tipos-de-cambio` y cotizaciones diarias oficiales.
- **Información disponible:**
  - Tipo de Cambio Oficial (TCO) de compra y venta para USD/BOB.
  - Tabla de cotizaciones diarias para monedas extranjeras (PEN, ARS, BRL, EUR, CLP, etc.).
  - Unidad de Fomento de Vivienda (UFV) diaria.
  - Tasas de interés de referencia y cotización de metales preciosos (oro, plata).
- **Evidencia verificada:** El BCB publica diariamente en días hábiles la tabla oficial de cotizaciones y el cálculo de la UFV.
- **Método de consulta y disponibilidad de API:** El BCB publica las cotizaciones en tablas HTML y reportes PDF/Excel para el público general. No dispone de un endpoint REST público documentado con OpenAPI o CORS abierto para navegadores.
- **Estrategia técnica implementada:**
  - Arquitectura desacoplada: Almacén base con la serie oficial confirmada.
  - Enlaces directos y botones de verificación que permiten al usuario cotejar la fuente primaria con un solo clic.
  - Cada dato almacena `effectiveDate` (fecha oficial de publicación por el BCB) y `retrievedAt` (momento de verificación).

---

## 2. Autoridad de Supervisión del Sistema Financiero (ASFI)

- **Institución:** ASFI Bolivia.
- **Enlace oficial:** [https://www.asfi.gob.bo/](https://www.asfi.gob.bo/)
- **Sección de interés:** Entidades Supervisadas -> Empresas de Servicios Financieros Complementarios -> Casas de Cambio.
- **Información disponible:**
  - Registro nacional de Casas de Cambio con Licencia de Funcionamiento otorgada por ASFI.
  - Razón social, sigla comercial, departamento, ciudad, dirección comercial y estado de licencia (Vigente / Cancelada / Clausurada).
- **Condiciones y marco regulatorio:** La ASFI fiscaliza que las casas de cambio operen dentro del marco normativo y exhiban pizarras transparentes de compra y venta.
- **Estrategia técnica implementada:**
  - Catálogo inicial curado y georreferenciado con base en los registros públicos emitidos por ASFI en las principales plazas cambiarias:
    - **La Paz:** Centro histórico (Calle Colón, Camacho, Mercado), Zona Sur (Calacoto, San Miguel).
    - **Santa Cruz de la Sierra:** Centro (Calle 24 de Septiembre, René Moreno), Equipetrol.
    - **Cochabamba:** Centro (Calle Nataniel Aguirre, 25 de Mayo, Plaza Colón).
  - Cada ficha incluye su número de registro/licencia o estado de verificación, horario comercial y coordenadas para el mapa.

---

## 3. Aduana Nacional de Bolivia (ANB)

- **Institución:** Aduana Nacional de Bolivia.
- **Enlace oficial:** [https://www.aduana.gob.bo/](https://www.aduana.gob.bo/)
- **Marco normativo relevante:**
  - **Decreto Supremo Nº 28761 (21/06/2006):** Prohibición terminante de importación y comercialización de prendería usada, ropa vieja, trapos y desechos en todo el territorio boliviano.
  - **Ley General de Aduanas (Ley Nº 1990):** Clasificación arancelaria, Gravamen Arancelario (GA), Impuesto al Valor Agregado de Importación (IVA 14.94% efectivo) y regímenes de menor cuantía.
- **Estrategia técnica implementada:**
  - Las calculadoras comerciales desglosan con total transparencia los costos base e incluyen una advertencia legal obligatoria: *Las calculadoras están diseñadas para mercancías de importación lícita y comercio formal. La internación de mercancías prohibidas constituye delito aduanero de contrabando.*

---

## 4. OpenStreetMap (OSM) y Cartografía

- **Proveedor:** Fundación OpenStreetMap.
- **Enlace:** [https://www.openstreetmap.org/](https://www.openstreetmap.org/)
- **Licencia:** Open Database License (ODbL).
- **Condiciones de uso:** Atribución obligatoria (*© OpenStreetMap contributors*), uso sin cuotas monetarias ni registro de tarjeta de crédito.
- **Estrategia técnica implementada:** Carga de azulejos a través del estándar Leaflet con atribución explícita en el pie del mapa.
