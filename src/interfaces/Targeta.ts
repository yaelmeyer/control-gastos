import { Targetas } from "@prisma/client"

export interface Targeta{
    nombre          : Targetas
    cierre          : Date
    vencimiento     : Date
    limite          : number
    disponibilidad  : number
}