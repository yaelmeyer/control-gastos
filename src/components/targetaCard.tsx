import { Targeta } from "@/interfaces/Targeta"

interface Props{
    targeta: Targeta
}

export const TargetaCard = ({targeta}:Props) => {

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden bg-white border">
        <h2 className="text-4xl font-bold text-gray-800">{targeta.nombre}</h2>
        <p className="">cierre: {targeta.cierre.getDate()}/{targeta.cierre.getMonth()+1}/{targeta.cierre.getFullYear()}</p>
        <p className="">vencimiento: {targeta.vencimiento.getDate()}/{targeta.vencimiento.getMonth()+1}/{targeta.vencimiento.getFullYear()}</p>
        <p className="">limite: {targeta.limite}</p>
        <p className="">disponibilidad: {targeta.disponibilidad}</p>
    </div>
  )
}
