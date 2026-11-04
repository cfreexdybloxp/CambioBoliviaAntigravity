import { ExchangeHouse } from '../types';

/**
 * Directorio de casas de cambio.
 *
 * Estado actual: VACÍO a propósito.
 *
 * La versión anterior incluía establecimientos, licencias ASFI, teléfonos,
 * direcciones y pizarras de compra/venta que no pudieron contrastarse con
 * ninguna fuente pública. Publicarlos como "verificados" contradecía la regla
 * de veracidad del proyecto, así que se retiraron.
 *
 * Para añadir un registro debe cumplirse todo esto:
 *  1. Existir en el registro público de entidades supervisadas por ASFI
 *     (https://www.asfi.gob.bo/ → Supervisión → Entidades Supervisadas).
 *  2. Citar la URL exacta de la fuente y la fecha de consulta.
 *  3. Marcar `verification: 'VERIFICADO_FUENTE'` solo si se comprobó el dato.
 *  4. Si la cotización proviene del propio establecimiento y no se comprobó,
 *     usar `verification: 'NO_VERIFICADO'` y explicarlo en la interfaz.
 *
 * No inventar registros para "llenar" el mapa.
 */
export const EXCHANGE_HOUSES: ExchangeHouse[] = [];
