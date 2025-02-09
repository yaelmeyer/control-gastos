'use client'

import { GastoC } from "@prisma/client";
import GastoLineaPage from "../gastoLinea";
import { useAppSelector } from "@/store";
import GastoLineaFiltroPage from "../gastoLineaFiltro";

interface Props{
    gastosC : GastoC[]
    targeta : any
}

export default function ListGastosPage({gastosC, targeta}: Props) {
  const categorias = useAppSelector((state) => state.categorias.categorias)
  const gastosCFiltrados = gastosC.filter( (gastoC:any) => !categorias.includes(gastoC.gasto!.categoria))
 console.log(categorias)
  return (
    <>
        {/* {gastosC.map((gastoC:any) =>(
            <GastoLineaPage key={gastoC.id} gastoC={gastoC} targeta={targeta?.nombre}/>
        ))} */}
        {
          gastosCFiltrados.map((gastoC:any) =>(
            <GastoLineaPage key={gastoC.id} gastoC={gastoC} targeta={targeta?.nombre}/>
          ))
        }
        {
          categorias.map((categoria:any) => (
            <GastoLineaFiltroPage key={categoria} categoria={categoria} monto={gastosC.filter((gastosC:any)=> gastosC.gasto!.categoria == categoria).reduce((sum:number, gastoC:any) => sum + gastoC.gasto!.monto, 0)}/>
          ))
        }
    </>
  );
}