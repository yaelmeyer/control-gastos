'use client'

import { useEffect, useState } from "react"
import clsx from 'clsx'
import { inicializarTotalMesesByTargeta } from "@/lib/utils"

interface Props {
  targeta: any
}

export default function TargetaMesPage({targeta}: Props) {
  const [targetaCargada, setTargetaCargada] = useState(false)
  const [totalxmes, setTotalxmes] = useState<number[]>([])
  const [mesActual, setMesActual] = useState<number>(0)
  const mesesTotaltes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'noviembre', 'Diciembre']
  // const mesActual = (new Date()).getMonth()
  const meses = mesesTotaltes//mesesTotaltes.slice(mesActual)
  
useEffect(() =>{
  setTotalxmes(inicializarTotalMesesByTargeta(targeta))
  setMesActual( (new Date()).getMonth() )
}, [])
  //funciones

//fin funciones

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4x1">
        {
            meses.map((mes, i) =>(
                <div key={i} className={clsx(
                  "bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow",
                  {
                    'bg-red-400': +i < +mesActual
                  })}>
                    <h2 className="text-xl font-bold text-gray-800">{mes}</h2>
                    <h2 className="text-lg font-bold text-gray-800">{totalxmes[i]}</h2>
                </div>
            ))
        }
      </div>
    </div>
  );
}