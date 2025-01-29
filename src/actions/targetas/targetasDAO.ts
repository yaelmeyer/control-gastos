'use server'

import prisma from '@/lib/prisma'

import { CompraCredito, Gasto } from "@/interfaces/Gasto"
import { Targetas } from '@prisma/client'
import { NextResponse } from 'next/server';

export const newGastoC = async(gasto: Gasto, infoCompra: CompraCredito) =>{
    const {...nuevoGasto} = gasto
    let targeta = await getTargeta(infoCompra.targeta)
    let gastoC = null

    try{
        gastoC = await prisma.gastoC.create({ 
            data:{
                cuotas: infoCompra.cuotas,
                cuotaActual : infoCompra.cuotaActual,
                targetaC: {
                    connect: {id: targeta?.id}
                }
            }
        })
    } catch(error){
        console.log('error al crear gasto')
        if(error){
            console.log(''+error)
        }
    }
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
        console.log('error al crear gasto de credito')
        if(error){
            console.log(''+error)
        }
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
                gastosC: {
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