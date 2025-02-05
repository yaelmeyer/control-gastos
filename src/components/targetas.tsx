'use client'

import { Targeta } from "@/interfaces/Targeta";
import { TargetaCard } from "./targetaCard";
import { useRouter } from "next/navigation";

interface Props{
    targetas: Targeta[]
}

export default function TargetasPage({targetas}: Props) {
    const router = useRouter()
//funciones
    const verTargeta =(nombre:string) =>{
        router.push(`/targetas/targeta/${nombre}`)
    } 

  return (
    <div>
        {
            targetas?.map(targeta => (
                <div key={targeta.nombre} onClick={()=>verTargeta(targeta.nombre)}>
                    <TargetaCard targeta={targeta}/>
                </div>
            ))
        }
    </div>
  );
}