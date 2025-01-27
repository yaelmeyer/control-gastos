import { Targetas } from '@prisma/client';

export interface Gasto{
    descripcion : string
    monto       : number
    fecha       : Date
    categoria   : string
}

export interface CompraCredito{
    cuotas      : number
    targeta    : Targetas
}