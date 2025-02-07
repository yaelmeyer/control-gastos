'use client'

import { deleteCategoria } from "@/actions/targetas/categoriaDAO";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";

interface Props{
    nombre:string
}

export default function BotonDeletePage({nombre}: Props) {
    const router = useRouter()

    const eliminarCategoria = async(nombre:string)=>{
        try {
            const categoriaEliminada = await deleteCategoria(nombre)

            router.push('/categorias')
        } catch (error) {
            console.log('error al eliminar categoria')
            console.log(''+error)
        }
    }

  return (
    <div>
      <button onClick={()=> eliminarCategoria(nombre)}><RiDeleteBin2Line/></button>
    </div>
  );
}