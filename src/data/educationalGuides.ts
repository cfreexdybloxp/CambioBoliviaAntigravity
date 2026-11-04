import { EducationalGuide } from '../types';

export const EDUCATIONAL_GUIDES: EducationalGuide[] = [
  {
    id: 'guia-tco-vs-comercial',
    slug: 'tipo-de-cambio-oficial-vs-comercial',
    title: '¿Qué diferencia hay entre el Tipo de Cambio Oficial del BCB y el Comercial?',
    category: 'Divisas',
    readingTimeMinutes: 4,
    summary: 'Aprenda a identificar qué cotización le están aplicando en ventanilla, por qué existen diferenciales y qué instituciones regulan cada tasa en Bolivia.',
    sourceReference: 'Banco Central de Bolivia (Ley 1670) y ASFI (Recopilación de Normas para Servicios Financieros).',
    content: `
### 1. El Tipo de Cambio Oficial (TCO)
El Banco Central de Bolivia (BCB) publica a diario el Tipo de Cambio Oficial en su Tabla de Cotizaciones. Es la referencia que se usa en registros contables, obligaciones tributarias ante el Servicio de Impuestos Nacionales (SIN), operaciones aduaneras y balances. El BCB publica **una sola cotización por moneda**, no un par de compra y venta.

### 2. Cotización Comercial en Casas de Cambio
Las casas de cambio autorizadas por la ASFI operan con pizarras de compra y venta. La ASFI exige que estas pizarras estén colocadas de forma visible al público. El precio de venta (lo que el cliente paga para obtener divisas) suele incluir los costos operativos de intermediación, transporte físico de billetes y custodia de valores.

### 3. Diferencia entre Compra y Venta (*Spread*)
- **Precio de Compra:** El dinero en Bolivianos que la entidad le entrega a usted a cambio de sus dólares o moneda extranjera.
- **Precio de Venta:** El dinero en Bolivianos que usted debe pagar a la entidad para adquirir moneda extranjera.
La diferencia entre ambos se conoce como margen cambiario o *spread*.
    `,
    keyTakeaways: [
      'El BCB publica el Tipo de Cambio Oficial para fines normativos y fiscales.',
      'Las casas de cambio autorizadas deben exhibir su licencia ASFI y pizarras transparentes.',
      'Nunca confunda el precio de compra con el de venta al comparar establecimientos.'
    ]
  },
  {
    id: 'guia-abrir-casa-cambio-bolivia',
    slug: 'requisitos-abrir-casa-de-cambio-asfi-bolivia',
    title: '¿Cómo abrir y registrar legalmente una Casa de Cambio en Bolivia? Requisitos ASFI y UIF',
    category: 'Normativa',
    readingTimeMinutes: 7,
    summary: 'Guía paso a paso sobre el marco regulatorio para constituir una casa de cambio autorizada por ASFI, medidas de seguridad física exigidas y registro ante la UIF.',
    sourceReference: 'Autoridad de Supervisión del Sistema Financiero (ASFI) - Recopilación de Normas para Servicios Financieros (Título II, Capítulo III) y Ley Nº 393.',
    content: `
### 1. Marco Legal e Instituciones Competentes
En Bolivia, la actividad cambiaria profesional no puede ejercerse de manera informal sin autorización previa del Estado. Las instituciones que norman y fiscalizan este rubro son:
- **ASFI (Autoridad de Supervisión del Sistema Financiero):** Otorga la Licencia de Funcionamiento y fiscaliza la idoneidad financiera y legal.
- **UIF (Unidad de Investigaciones Financieras):** Supervisa el cumplimiento de la normativa antilavado y prevención del financiamiento del terrorismo (LGI/FT).
- **Servicio de Impuestos Nacionales (SIN):** Emisión de NIT en el Régimen General para facturación comercial.
- **Gobierno Autónomo Municipal:** Emisión de Licencia de Funcionamiento de local comercial.

### 2. Forma Jurídica y Constitución
Para operar formalmente, debe constituirse como persona jurídica bajo una de las siguientes figuras comerciales:
- **Sociedad de Responsabilidad Limitada (S.R.L.)** o **Sociedad Anónima (S.A.)**.
- El objeto social debe ser exclusivo para la **compra y venta de moneda extranjera y cheques de viajero**.
- Capital mínimo social pagado en moneda nacional (acreditado en cuenta bancaria y certificado por balance de apertura auditado).

### 3. Exigencias de Infraestructura y Seguridad Física
Por normativa expresa de la ASFI, el local físico debe cumplir estándares de alta seguridad:
1. **Ventanillas de atención:** Vidrio blindado de alta resistencia con bandeja pasadocumentos/pasadinero.
2. **Caja Fuerte / Bóveda:** Anclada a la estructura física del inmueble con cerradura de combinación o retardo.
3. **Circuito Cerrado de Televisión (CCTV):** Cámaras con grabación continua de alta definición y respaldo de video por mínimo 90 días naturales, enfocando ventanillas, ingresos y caja.
4. **Alarma silenciosa y sonora:** Monitoreada y conectada con la central de la Policía Boliviana o empresa de seguridad acreditada.

### 4. Oficial de Cumplimiento y Prevención (UIF)
Toda casa de cambio es Sujeto Obligado ante la UIF:
- Debe designar un **Oficial de Cumplimiento** registrado ante la UIF.
- Implementar la política "Conozca a su Cliente" (KYC): solicitar cédula de identidad en operaciones que superen los umbrales normativos fijados por ley.
- Llevar registro cronológico inalterable de cada compra y venta de divisa.

### 5. Obligaciones en la Operación Diaria
- **Pizarra física visible:** Exhibir a la entrada o sobre ventanilla las tasas de compra y venta del día para cada divisa con tipografía clara y sin enmiendas.
- **Comprobante cambiario:** Emitir a cada cliente un recibo o comprobante formal donde conste la fecha, tipo de cambio pactado, monto entregado y monto recibido.
    `,
    keyTakeaways: [
      'Es ilegal operar una casa de cambio sin Licencia de Funcionamiento emitida por ASFI.',
      'El local exige infraestructura blindada, CCTV de 90 días y alarma policial.',
      'Debe reportarse periódicamente ante la UIF cumpliendo protocolos de prevención de lavado.'
    ]
  },
  {
    id: 'guia-margen-vs-markup',
    slug: 'margen-bruto-vs-recargo-markup',
    title: 'Margen Bruto vs. Recargo (Markup): El error contable que quiebra negocios',
    category: 'Finanzas y Costos',
    readingTimeMinutes: 5,
    summary: 'Descubra por qué fijar un recargo del 30% sobre el costo no le otorga un margen de ganancia del 30% en sus ventas.',
    sourceReference: 'Principios de Contabilidad Generalmente Aceptados y Normas de Contabilidad en Bolivia.',
    content: `
### La confusión más común en el comercio
Muchos comerciantes compran un artículo por 100 Bs, le suman el "30%" esperando ganar el 30% de sus ingresos, y fijan el precio en 130 Bs. Sin embargo, al venderlo:
- Ganancia: 30 Bs
- Ingreso por venta: 130 Bs
- **Margen real:** 30 / 130 = **23,08%** (no 30%).

### Las Fórmulas Correctas:
1. **Recargo (*Markup*):** Es el porcentaje que se le añade al costo de adquisición.
   $$\\text{Markup} = \\frac{\\text{Ganancia}}{\\text{Costo}} \\times 100$$
2. **Margen Bruto:** Es el porcentaje del dinero cobrado que queda como ganancia.
   $$\\text{Margen} = \\frac{\\text{Ganancia}}{\\text{Precio de Venta}} \\times 100$$

### Cómo calcular el precio de venta para un margen deseado:
Si su producto costó 100 Bs y usted necesita un margen neto del 30% para cubrir alquiler y sueldos:
$$\\text{Precio} = \\frac{\\text{Costo}}{1 - 0,30} = \\frac{100}{0,70} = 142,86\\text{ Bs}$$
    `,
    keyTakeaways: [
      'El Recargo se calcula sobre el costo; el Margen se calcula sobre el precio de venta.',
      'El Recargo siempre es numéricamente mayor que el Margen para una misma operación.',
      'Nuestras calculadoras le muestran ambos indicadores para evitar errores de fijación de precios.'
    ]
  },
  {
    id: 'guia-normativa-ropa-usada',
    slug: 'normativa-decreto-28761-prohibicion-ropa-usada',
    title: 'Normativa Aduanera: Prohibición del Decreto Supremo 28761 y alternativas legales',
    category: 'Normativa',
    readingTimeMinutes: 4,
    summary: 'Conozca por qué la internación comercial de prendería usada está tipificada como contrabando y cómo emprender en confección textil lícita.',
    sourceReference: 'Decreto Supremo Nº 28761 (2006) y Ley General de Aduanas Nº 1990.',
    content: `
### El Marco Legal en Bolivia
El **Decreto Supremo Nº 28761**, del 21 de junio de 2006, fijó el fin de la importación de prendería usada: el Artículo 3 prohíbe su importación **a partir del 21 de abril de 2007** y su comercialización **a partir del 1 de marzo de 2008**, de forma indefectible. También prohíbe la importación y comercialización de prendería vieja, desechos, desperdicios, ropa íntima, de cama y de tocador.

### Razones de la Prohibición:
1. **Salud Pública:** La falta de trazabilidad sanitaria y riesgo epidemiológico (hongos, dermatitis, plagas).
2. **Protección a la Industria Nacional:** Salvaguardar a los microempresarios de la confección, tejedores y diseñadores bolivianos.

### Consecuencias Aduaneras:
La Aduana Nacional decomisa cualquier internación ilegal. Dichos lotes no son subastados para uso de vestir, sino sometidos a **"Subasta Ecológica"** para ser triturados como material de relleno industrial o aislante.

### Alternativas Comerciales Legales:
- Fabricación nacional en polos de confección (El Alto, Villa Fátima, Cochabamba, Santa Cruz).
- Distribución de telas e hilados nacionales o legalmente nacionalizados.
- Importación formal de indumentaria y calzado nuevos cumpliendo aranceles (GA e IVA aduanero).
    `,
    keyTakeaways: [
      'La importación comercial de ropa usada está prohibida por ley y no es susceptible de nacionalización.',
      'El contrabando arriesga la incautación total de capital y sanciones penales.',
      'Cambio Bolivia fomenta exclusivamente el comercio lícito, la confección nacional y la formalización.'
    ]
  },
  {
    id: 'guia-regimen-tributario',
    slug: 'regimen-simplificado-vs-general-bolivia',
    title: 'Régimen Simplificado (RTS) vs. Régimen General: ¿Qué impuestos paga tu negocio en Bolivia?',
    category: 'Normativa',
    readingTimeMinutes: 5,
    summary: 'Aprenda qué régimen del Servicio de Impuestos Nacionales (SIN) le corresponde según su capital, si debe emitir factura y cómo evitar multas tributarias.',
    sourceReference: 'Decreto Supremo Nº 24484 y Decreto Supremo Nº 3698 (Actualización del RTS - Servicio de Impuestos Nacionales).',
    content: `
### 1. ¿Qué es el Régimen Tributario Simplificado (RTS)?
El RTS es un régimen especial creado para pequeños contribuyentes:
- **Comerciantes minoristas:** Quienes venden al consumidor final en quioscos o puestos de mercado.
- **Artesanos:** Quienes transforman materia prima en talleres pequeños de confección o manufactura.
- **Vivanderos:** Vendedores de alimentos en puestos fijos o ambulantes.

### 2. Requisitos y Límites de Capital (D.S. 3698):
- Capital de operación: **Entre 12.001 Bs y 60.000 Bs**.
- Ventas anuales: No deben superar los **184.000 Bs**.
- **No emiten factura.** Pagan una cuota fija bimestral al SIN según su categoría (de 47 Bs a 350 Bs cada dos meses).

### 3. ¿Cuándo debes pasar al Régimen General?
Si tu capital supera los 60.000 Bs, tus ventas exceden los 184.000 Bs o tienes un precio unitario de venta superior al tope legal (artesanías > 640 Bs, comercio > 480 Bs), debes inscribirte en el **Régimen General**:
- Emisión obligatoria de facturas (Facturación en Línea / SIAT).
- Pago mensual del **IVA (13%)** en Formulario 200 y del **IT (3%)** en Formulario 400.
- Pago anual del **IUE (25%)** en Formulario 500.
    `,
    keyTakeaways: [
      'El RTS exime de emitir factura a microcomerciantes con capital menor a 60.000 Bs.',
      'Los negocios mayoristas o con capital superior deben operar en el Régimen General.',
      'Las compras formales con factura permiten descargar Crédito Fiscal IVA.'
    ]
  },
  {
    id: 'guia-comercio-frontera',
    slug: 'claves-cambiarias-comercio-frontera-bolivia',
    title: 'Comercio en Ciudades Fronterizas: Desaguadero, Pisiga, Yacuiba y Puerto Quijarro',
    category: 'Comercio e Importación',
    readingTimeMinutes: 6,
    summary: 'Estrategias cambiarias y precauciones aduaneras para el comercio formal en las principales fronteras con Perú, Chile, Argentina y Brasil.',
    sourceReference: 'Aduana Nacional de Bolivia y Acuerdos de Tránsito Fronterizo del Mercosur y la CAN.',
    content: `
### 1. Dinámica Cambiaria por Frontera
- **Desaguadero (Frontera Perú):** Operaciones intensivas en Soles (PEN) y Dólares (USD). Alta demanda de textiles y confección. Es vital calcular la tasa cruzada PEN/BOB antes de pagar en moneda extranjera.
- **Pisiga / Tambo Quemado (Frontera Chile):** Puertos de entrada de mercancía asiática nacionalizada vía Iquique/Arica. Las liquidaciones aduaneras de fletes marítimos se pactan en USD.
- **Yacuiba / Bermejo / Villazón (Frontera Argentina):** Alta volatilidad del Peso Argentino (ARS). Se recomienda operar con cotizaciones de ventanilla del día para evitar desfasajes por inflación cambiaria.
- **Puerto Quijarro / Guayaramerín (Frontera Brasil):** Comercio activo en Reales (BRL). Utilizado para insumos plásticos, maquinaria y agroindustria.

### 2. Régimen de Tránsito Vecinal Fronterizo (TVF)
Los residentes de municipios fronterizos pueden internar pequeñas cantidades de víveres o consumo familiar libre de tributos dentro de una cuota de subsistencia. Sin embargo, **cualquier lote con fines de reventa o comercio interior exige importación a consumo formal con DUI/DIM**.

### 3. Buenas Prácticas para Emprendedores
- Nunca transporte efectivo en montos superiores al límite legal sin declaración de divisas ante la Aduana (10.000 USD o su equivalente).
- Exija factura de exportación o comprobante comercial formal en el país de origen para justificar el valor CIF ante el recinto aduanero boliviano.
    `,
    keyTakeaways: [
      'Cada frontera boliviana tiene una divisa dominante (PEN, ARS, CLP o BRL) triangulada con el USD y el BOB.',
      'El régimen vecinal no autoriza la reventa mayorista en el eje central sin nacionalización.',
      'Utilice nuestras calculadoras de costo de importación para evaluar la viabilidad antes de viajar.'
    ]
  }
];
