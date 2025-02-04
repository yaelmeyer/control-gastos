'use client'

import { newGastoC, updateGasto } from "@/actions/targetas/targetasDAO"
import { Gasto, GastoC, Targetas } from "@prisma/client"
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
    gasto?  : Gasto,
    gastoC? : GastoC,
    update  : boolean   
}

export default function NewGastoFromPage({gasto, gastoC, update}: Props) {
    // const update:boolean = gasto && gastoC ? true : false
    console.log('update: '+ update)
    console.log('gasto ',gasto)
    console.log('gastoC ', gastoC)
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}, watch} = useForm<FormValues>()
    const [guardado, setGuardado] = useState(false)
  
    const gastoNuevo = watch('gastoNuevo')

    const onSubmit = async(data:FormValues) =>{
        console.log(data)
        const newGasto = {
          id : gasto?.id,
          descripcion: data.descripcion,
          monto: +data.monto,
          fecha: new Date(data.fecha),
          categoria: data.categoria
        }
        const infoCompra = {
            id: gastoC?.id,
          cuotas: +data.cuota,
          cuotaActual : +(data.gastoNuevo) ? 1 : +data.cuotaActual,
          targeta: data.Targeta
        }
        if(!update)
            await newGastoC(newGasto, infoCompra)
        else
            await updateGasto(newGasto, infoCompra)

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
                    defaultValue={update? gasto?.descripcion: ''}               
                    {...register('descripcion', {required: !update? 'la descripcion es obligatorio' : false})}
            />
            {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="categoria">Categoria</label>
            <input type="text" id="categoria"
                    defaultValue={update? gasto?.categoria : ''}
                    {...register('categoria', {required: !update? 'la categoria es obligatoria' :false})}
            />
            {errors.categoria && <p className="text-red-500">{errors.categoria.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="monto">Monto</label>
            <input type="text" id="monto" 
                    defaultValue={update? gasto?.monto : ''}
                    {...register('monto', {required: !update? 'el monto es obligarorio' : false,
                                           min:{value:0.00000001, message: 'El monto debe ser mayor a cero'}
                    })}
            />
            {errors.monto && <p className="text-red-500">{errors.monto.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="fecha">Fecha compra</label>
            <input type="date" id="fecha" 
                    defaultValue={update? gasto?.fecha.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    {...register('fecha', {required: !update? 'el fecha es obligaroria' : false})}
            />
            {errors.fecha && <p className="text-red-500">{errors.fecha?.message}</p>}
        </div>
        <div>
            <label className="block font-semibold" htmlFor="cuota">Cuotas</label>
            <input type="text" id="cuota" 
                defaultValue={gastoC? gastoC.cuotas : ''}
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
                defaultValue={update? gastoC?.cuotaActual! : 0}
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