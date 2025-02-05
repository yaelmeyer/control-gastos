import { Targetas } from '@prisma/client';

export interface Gasto{
    id?         : string
    descripcion : string
    monto       : number
    fecha       : Date
    categoria   : string
}

export interface CompraCredito{
    id?         : string
    cuotas      : number
    targeta     : Targetas
    cuotaActual : number
}