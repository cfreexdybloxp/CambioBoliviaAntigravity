import { Supplier } from '../types';

/**
 * Directorio de proveedores.
 *
 * Estado actual: VACÍO a propósito.
 *
 * La versión anterior listaba empresas con NIT, teléfonos, direcciones y
 * rangos de precio que no se pudieron contrastar con SEPREC, Fundempresa ni
 * ninguna cámara. Se retiraron para no presentar datos inventados como
 * verificados.
 *
 * Criterios para publicar un registro:
 *  1. Que el NIT/ matrícula exista en el registro público (SEPREC).
 *  2. Citar la fuente consultada y la fecha.
 *  3. No publicar precios que no estén confirmados por el proveedor.
 *  4. Marcar `verification: 'NO_VERIFICADO'` mientras no se compruebe.
 */
export const SUPPLIERS: Supplier[] = [];
