'use client'

import { getAllCategorias, newCategoria } from "@/actions/targetas/categoriaDAO";
import BotonDeletePage from "@/components/categorias/botonDelete";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    descripcion : string
}

export default function CategoriasPage() {
    const router = useRouter()
    const {register, handleSubmit, reset,formState:{errors}, watch} = useForm<FormValues>()
    const [categorias, setCategorias] = useState<any>([])

    const guardarCategoria = async(data:FormValues) =>{
        await newCategoria(data.descripcion)

        router.refresh()
    }

    useEffect(() => {
        inicializarCategorias()
    }, [])

    const inicializarCategorias = async() => {
        const categoriasObtenidas = await getAllCategorias()
        const categorias = categoriasObtenidas?.map((categoria) => ({
            descripcion: categoria!.descripcion
        }))

        setCategorias(categorias)
    }

  return (
    <div>
    <form onSubmit={handleSubmit(guardarCategoria)} className="space-y-4">
        <label className="block font-semibold" htmlFor="descripcion">Categoria Nueva</label>
        <input type="text" id="descripcion" className="bg-gray-200 p-2 rounded-lg"
            {...register('descripcion', {required: 'la descripcion es obligatorio'})}
        />
        {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
        <button type="submit">Guardar</button>
    </form>
      <h2>Categorias</h2>
        <div className="grid grid-cols-1 gap-4">
            {
                categorias?.map((categoria:any, index:number) => (
                    <div key={index} className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-lg font-bold">{categoria.descripcion}</h3>
                        <BotonDeletePage nombre={categoria.descripcion}/>
                    </div>
                ))
            }
        </div>
    </div>
  );
}