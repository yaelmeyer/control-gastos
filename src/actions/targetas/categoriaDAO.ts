'use server'

import prisma from "@/lib/prisma"

export const newCategoria = async (categoria:string) => {
    console.log('categoria: ' + categoria)
    try {
        const categoriaNueva = await prisma.categoria.create({
            data: {
                descripcion: categoria
            }
        })
        console.log(categoriaNueva)
        return categoriaNueva
    } catch (error) {
        console.log('error al crear categoria')
        console.log('' + error)
    }
}

export const deleteCategoria = async (nombre:string) => {
    try {
        const categoria = await prisma.categoria.delete({
            where: {descripcion: nombre}
        })

        return categoria
    } catch (error) {
        console.log('error al eliminar categoria')
        console.log('' + error)
    }
}

export const getAllCategorias = async () => {
    try {
        const categorias = await prisma.categoria.findMany()

        return categorias
    } catch (error) {
        console.log('error al obtener categorias')
        console.log('' + error)
    }
}