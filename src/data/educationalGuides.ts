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
En Bolivia, el Banco Central de Bolivia (BCB) fija y publica el Tipo de Cambio Oficial. Esta tasa es la referencia legal obligatoria para la contabilidad pública, la liquidación de tributos ante el Servicio de Impuestos Nacionales (SIN), las operaciones aduaneras y los balances bancarios.

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
El **Decreto Supremo Nº 28761** estableció la prohibición definitiva de la importación y comercialización de prendería usada, ropa vieja, trapos, desperdicios textiles y calzado usado.

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
  }
];
