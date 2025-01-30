'use client'

import { newGastoC } from "@/actions/targetas/targetasDAO"
import { CompraCredito, Gasto } from "@/interfaces/Gasto"
import { Targetas } from "@prisma/client"
import { useRouter } from "next/navigation"
import { log } from "node:console"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  descripcion : string,
  monto       : number,
  categoria   : string,
  fecha       : Date,
  cuota       : number,
  Targeta     : Targetas,
  gastoNuevo  : boolean,
  cuotaActual  : number
}

interface Props{
    gasto?   : Gasto,
    gastoC?  : CompraCredito
}

export default function NewGastoFromPage({gasto, gastoC}: Props) {
    const update:boolean = gasto && gastoC ? true : false
    console.log('update: '+ update)
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}, watch} = useForm<FormValues>()
    const [guardado, setGuardado] = useState(false)
  
    const gastoNuevo = watch('gastoNuevo')

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
          cuotaActual : +(data.gastoNuevo) ? 1 : +data.cuotaActual,
          targeta: data.Targeta
        }
        const gasto = await newGastoC(newGasto, infoCompra)
        setGuardado(true)
        router.push(`/targetas/targeta/${data.Targeta}`)
      }

  return (
    <div>
      {!guardado?(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <label className="block font-semibold" htmlFor="descripcion">Descripcion</label>
            <input type="text" id="descripcion"     
                    value={update? gasto?.descripcion: ''}               
                    {...register('descripcion', {required: !update? 'la descripcion es obligatorio' : false})}
            />
            {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="categoria">Categoria</label>
            <input type="text" id="categoria"
                    value={update? gasto?.categoria : ''}
                    {...register('categoria', {required: !update? 'la categoria es obligatoria' :false})}
            />
            {errors.categoria && <p className="text-red-500">{errors.categoria.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="monto">Monto</label>
            <input type="text" id="monto" 
                    value={update? gasto?.monto : 0}
                    {...register('monto', {required: !update? 'el monto es obligarorio' : false,
                                           min:{value:0.00000001, message: 'El monto debe ser mayor a cero'}
                    })}
            />
            {errors.monto && <p className="text-red-500">{errors.monto.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="fecha">Monto</label>
            <input type="date" id="fecha" 
                    value={update? gasto?.fecha.toString() : new Date().toISOString()}
                    {...register('fecha', {required: !update? 'el fecha es obligaroria' : false})}
            />
            {errors.fecha && <p className="text-red-500">{errors.fecha?.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="cuota">Cuotas</label>
            <input type="number" id="cuota" 
                value={update? gastoC?.cuotas : 0}
                {...register('cuota', {required: !update? 'el cuota es obligaroria' : false,
                    min: {value: 1, message: 'las cuotas deben ser mayor que cero'}
                })}
            />
            {errors.cuota && <p className="text-red-500">{errors.cuota?.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="targeta">Targeta</label>
            <select id="targeta" defaultValue="" 
            {...register('Targeta', {required: update? 'la targeta es obligatoria' : false})}
            >
            {Object.entries(Targetas).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
            </select>
        </div>
        <div>
            <label className="block font-semibold" htmlFor="gastoNuevo">Targeta</label>
            <select id="gastoNuevo" defaultValue="" 
            {...register('gastoNuevo', {required: update? 'gastoNuevo es obligatorio' : false})}
            >
                <option key={1} value={1}>Gasto Nuevo</option>
                <option key={2} value={0}>Gasto Viejo</option>
            </select>
        </div>
        {gastoNuevo == false &&(
            <div>
            <label className="block font-semibold" htmlFor="cuotaActual">Cuota</label>
            <input type="number" id="cuotaVieja" 
                value={update? gastoC?.cuotaActual : 0}
                {...register('cuotaActual', {required: update? 'cuotaActual es obligaroria' : false,
                    min:{value: 0, message: 'la cuota actual debe ser mayor a cero'}
                })}
            />
            {errors.cuota && <p className="text-red-500">{errors.cuota?.message}</p>}
            </div>
        )}
        <button type="submit">Guardar</button>
        </form>)
        :(<span>guardado</span>)
    }
    </div>
  );
}