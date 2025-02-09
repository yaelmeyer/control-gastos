'use client'

import Link from "next/link";
import BotonDeletePage from "./botonDelete";
import { CiEdit } from "react-icons/ci";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";

interface Props{
    gastoC : any
    targeta : string
}

export default function GastoLineaPage({gastoC, targeta}: Props) {
  // console.log('gastoC: ',gastoC)
  const categoriasSelector = useAppSelector(state => state.categorias)
  // const categoriasFiltro = categoriasSelector.categorias
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>()

  useEffect(() => {
    setCategoriasFiltro(categoriasSelector.categorias)
    
  })

  return (
    <tr className="hover:bg-gray-100 text-lg">
        <td className="border border-gray-300 px-4 py-2">{gastoC.gasto?.descripcion}</td>
        <td className="border border-gray-300 px-4 py-2">{gastoC.gasto?.categoria}</td>
        <td className="border border-gray-300 px-4 py-2">${gastoC.gasto?.monto}</td>
        <td className="border border-gray-300 px-4 py-2">{gastoC.gasto?.fecha.toLocaleDateString()}</td>
        <td className="border border-gray-300 px-4 py-2">{gastoC.cuotas}</td>
        <td className="border border-gray-300 px-4 py-2">{gastoC.cuotaActual}</td>
        <td className="border border-gray-300 px-4 py-2"><Link href={`/formularios/newgastoc?update=1&idGastoC=${gastoC.id}`}><CiEdit/></Link></td>
        <td className="border border-gray-300 px-4 py-2"><BotonDeletePage idGasto={gastoC.gasto.id} idGastoC={gastoC.id} targeta={targeta}/></td>
    </tr>
  );
}