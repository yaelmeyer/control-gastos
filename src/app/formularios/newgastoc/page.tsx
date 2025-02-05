'use client'

import { getGastoC } from "@/actions/targetas/targetasDAO";
import NewGastoFromPage from "@/components/newGastoForm";
import { Suspense, useEffect, useState } from "react";

export default function NewGastoPage() {
  const [gastoC, setgastoC] = useState<any>()
  const [gasto, setgasto] = useState<any>()
  const [update, setupdate] = useState<boolean>()

  useEffect(()=>{
    inicializar()
  }, [])

  const inicializar = async() => {
    const urlParams = new URLSearchParams(window.location.search)
    const idGastoC = urlParams.get('idGastoC')
    const update  = +urlParams.get('update')!

    if(update){
      const gastoC = await getGastoC(idGastoC!)
      // gastoC?.gasto?.fecha.setHours(gastoC.gasto.fecha.getHours() - 3)
      setgastoC(gastoC)
      setgasto(gastoC?.gasto)
      setupdate(update == 1 ? true : false)
    }
  }

  return (
    <>
      <Suspense>
        <NewGastoFromPage gasto={gasto} gastoC={gastoC} update={update!}></NewGastoFromPage>
      </Suspense>
    </>
  );
}