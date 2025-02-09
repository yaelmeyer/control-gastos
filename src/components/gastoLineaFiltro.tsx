'use client'

import Link from "next/link";
import BotonDeletePage from "./botonDelete";
import { CiEdit } from "react-icons/ci";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";

interface Props{
    categoria : string
    monto : number
}

export default function GastoLineaFiltroPage({categoria, monto}: Props) {
  // console.log('gastoC: ',gastoC)
  const categoriasSelector = useAppSelector(state => state.categorias)
  // const categoriasFiltro = categoriasSelector.categorias
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>()

  useEffect(() => {
    setCategoriasFiltro(categoriasSelector.categorias)
    
  })

  return (
    <tr className="hover:bg-gray-100 text-lg">
        <td className="border border-gray-300 px-4 py-2" colSpan={2}>{categoria}</td>
        <td className="border border-gray-300 px-4 py-2">${monto}</td>
        <td className="border border-gray-300 px-4 py-2">-</td>
        <td className="border border-gray-300 px-4 py-2">-</td>
        <td className="border border-gray-300 px-4 py-2">-</td>
        <td className="border border-gray-300 px-4 py-2">-</td>
        <td className="border border-gray-300 px-4 py-2">-</td>
    </tr>
  );
}