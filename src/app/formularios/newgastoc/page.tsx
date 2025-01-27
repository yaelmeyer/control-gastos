'use client'

import { useForm } from "react-hook-form";
import { Targetas } from "@prisma/client";
import { newGastoC } from "@/actions/targetas/targetasDAO";
import { CompraCredito, Gasto } from "@/interfaces/Gasto";
import { useState } from "react";
import { Span } from "next/dist/trace";
import { useRouter } from "next/navigation";

type FormValues = {
  descripcion : string,
  monto       : number,
  categoria   : string,
  fecha       : Date,
  cuota       : number,
  Targeta     : Targetas
}

export default function NewGastoPage() {
  const router = useRouter()
  const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
  const [guardado, setGuardado] = useState(false)


  const onSubmit = async(data:FormValues) =>{
    console.log(data)
    const newGasto: Gasto = {
      descripcion: data.descripcion,
      monto: +data.monto,
      fecha: new Date(data.fecha),
      categoria: data.categoria
    }
    const infoCompra:CompraCredito ={
      cuotas: +data.cuota,
      targeta: data.Targeta
    }
    const gasto = await newGastoC(newGasto, infoCompra)
    setGuardado(true)
    console.log('a enviar '+data.Targeta)
    router.push(`/targetas/targeta/${data.Targeta}`)
  }
  return (
    <>
      
      {!guardado?(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold" htmlFor="descripcion">Descripcion</label>
            <input type="text" id="descripcion"
              {...register('descripcion', {required: 'el nombre es obligatorio'})}
            />
            {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
          </div>
          <div>
              <label className="block font-semibold" htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" 
                {...register('categoria', {required: 'la categoria es obligatoria'})}
              />
              {errors.categoria && <p className="text-red-500">{errors.categoria.message}</p>}
          </div>
          <div>
            <label className="block font-semibold" htmlFor="monto">Monto</label>
            <input type="text" id="monto" 
              {...register('monto', {required: 'el monto es obligarorio'})}
            />
            {errors.monto && <p className="text-red-500">{errors.monto.message}</p>}
          </div>
          <div>
            <label className="block font-semibold" htmlFor="fecha">Monto</label>
            <input type="date" id="fecha" 
              {...register('fecha', {required: 'el fecha es obligaroria'})}
            />
            {errors.fecha && <p className="text-red-500">{errors.fecha?.message}</p>}
          </div>
          <div>
            <label className="block font-semibold" htmlFor="cuota">Cuota</label>
            <input type="number" id="cuota" 
              {...register('cuota', {required: 'el cuota es obligaroria'})}
            />
            {errors.cuota && <p className="text-red-500">{errors.cuota?.message}</p>}
          </div>
          <div>
            <label className="block font-semibold" htmlFor="targeta">Targeta</label>
            <select id="targeta" defaultValue="" 
              {...register('Targeta', {required: 'la targeta es obligatoria'})}
            >
              {Object.entries(Targetas).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <button type="submit">Guardar</button>
        </form>)
        :(<span>guardado</span>)
      }
    </>
  );
}