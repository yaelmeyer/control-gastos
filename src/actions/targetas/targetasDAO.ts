'use server'

import prisma from '@/lib/prisma'

import { CompraCredito, Gasto } from "@/interfaces/Gasto"
import { Targetas } from '@prisma/client'
import { NextResponse } from 'next/server';

export const getGastoC = async(id: string) =>{
    try {
        const gastoC = await prisma.gastoC.findFirst({
            include:{
                gasto: true
            },
            where: {
                id: id
            }
        })

        return gastoC
    } catch (error) {
        console.log('error al obtener el gastoC')
        console.log(error)
    }
}

export const newGastoC = async(gasto: Gasto, infoCompra: CompraCredito) =>{
    const {...nuevoGasto} = gasto
    let targeta = await getTargeta(infoCompra.targeta)
    let gastoC = null
    // console.log('targeta: ', targeta)
    try{
        gastoC = await prisma.gastoC.create({ 
            data:{
                cuotas: infoCompra.cuotas,
                cuotaActual : infoCompra.cuotaActual,
                terminado   : false,
                targetaC: {
                    connect: {id: targeta?.id}
                }
            }
        })
    } catch(error){
        console.log('error al crear gastoC')
        if(error){
            console.log(''+error)
        }
    }
    if(gastoC){
        try{
            const gasto = await prisma.gasto.create({
                data: {
                    ...nuevoGasto,
                    gastoC: {
                        connect: {id: gastoC?.id}
                    }
                }
            })
    
            return {gasto, gastoC}
        } catch(error){
            console.log('error al crear gasto')
            if(error){
                console.log(''+error)
            }
        }
    }
}

export const updateGasto = async (gastoNew: Gasto, infoCompraNew: CompraCredito) =>{

    const {id,...gasto} = gastoNew
    const {id: idC,targeta, ... infoCompra} = infoCompraNew

    // console.log('gasto a actualizar: ', gastoNew)
    // console.log('gastoC a actualizar: ', infoCompraNew)

    const targetaC = await getTargeta(targeta)

    try {
        const gastoActualizado = await prisma.gasto.update({
            where: {id: id},
            data:{
                ...gasto
            }
        })

        const gastoCActualizado = await prisma.gastoC.update({
            where: {id : idC},
            data:{
                ...infoCompra,
                targetaCId: targetaC?.id
            }
        })

        // console.log(gastoActualizado)
        // console.log(gastoCActualizado)
        return
    } catch (error) {
        console.log('error actualizando gasto')
        console.log(''+error)
    }
}

export const getTargeta= async(targeta: Targetas) =>{
    try {
        const targetaEncontrada = await prisma.targetaC.findFirst({
            where:{
                nombre: targeta
            }
        })
        
        return targetaEncontrada
    } catch (error) {
        console.log('error al obtener targeta')
        console.log(''+error)
    }
}

export const getTargetaAndGastos = async(nombre: Targetas) =>{
    try {
        const targeta = await prisma.targetaC.findFirst({
            include:{
                gastosC: 
                {
                    where: {
                        terminado: false
                    },
                    include:{
                        gasto: true
                    }
                }
            },
            where:{
                nombre: nombre
            }
        })

        return targeta
    } catch (error) {
        console.log('error al obtener targetas y gastos')
        console.log(''+error)   
    }
}

export const getAllTargetas = async() =>{
    try {
        const targetas = await prisma.targetaC.findMany({})

        return targetas
    } catch (error) {
        console.log('error al obtener todas las targetas')
        console.log(''+error)
    }
}

export const deleteGasto = async(idGasto:string, idGastoC:string) => {
    try {
        const gastoEliminado = await prisma.gasto.delete({
            where:{
                id: idGasto
            }
        })

        const gastoCEliminado = await prisma.gastoC.delete({
            where: {
                id: idGastoC
            }
        })

        return [gastoEliminado,gastoCEliminado]
    } catch (error) {
        console.log('error al eliminar gastoC')
        console.log(''+error)
    }
}

//solo desarrollo
//TODO eliminar
const crearTergetaC = async() =>{
    const targeta = {
        nombre          : Targetas.visa,
        cierre          : new Date(),
        vencimiento     : new Date(),
        limite          : 3000000,
        disponibilidad  : 1500000
    }

    try {
        const targetaCreada = await prisma.targetaC.create({
            data: {
                ...targeta
            }
        })

        return NextResponse.json({
            targetaCreada
        })
    } catch (error) {
        console.log('error al crear targeta')
        if(error)
            console.log(''+error)
    }
}