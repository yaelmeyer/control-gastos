'use client'

import { Targeta } from "@/interfaces/Targeta";
import { TargetaCard } from "./targetaCard";

interface Props{
    targetas: Targeta[]
}

export default function TargetasPage({targetas}: Props) {
//funciones
    const saludar =() =>{
        console.log('holaa')
    } 

  return (
    <div>
        {
            targetas?.map(targeta => (
                <div key={targeta.nombre} onClick={()=>saludar()}>
                    <TargetaCard targeta={targeta}/>
                </div>
            ))
        }
    </div>
  );
}