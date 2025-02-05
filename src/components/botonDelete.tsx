'use client'

import { deleteGasto } from "@/actions/targetas/targetasDAO";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";

interface Props{
    idGasto:string
    idGastoC:string
    targeta:string
}


export default function BotonDeletePage({idGasto, idGastoC, targeta}: Props) {
    const router = useRouter()

const eliminarGasto = async(idGasto:string, idGastoC:string)=>{
    try {
        const gastoEliminado = await deleteGasto(idGasto, idGastoC)

        router.push(`/targetas/targeta/${targeta}`)
    } catch (error) {
        console.log('error al eliminar gasto')
        console.log(''+error)
    }
}


    return (
        <button onClick={()=> eliminarGasto(idGasto, idGastoC)}><RiDeleteBin2Line/></button>
    );
}