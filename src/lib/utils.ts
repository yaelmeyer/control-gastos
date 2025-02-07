import { TargetaC } from "@prisma/client";

export function inicializarTotalMesesByTargeta(targeta:TargetaC){
    let cont = 0;
    let mes = new Date().getMonth()
    let totalxmes = []
    for(let cont = 0; cont < 12; cont ++){
          totalxmes.push( calcularTotalMes(cont, targeta) )
    }

    return totalxmes
}

function calcularTotalMes(cont: number, targeta:any):number{
    let total = 0

    targeta.gastosC.forEach((gastoC:any) =>(
       total += (gastoC.cuotas >= gastoC.cuotaActual + cont) ? gastoC.gasto.monto/gastoC.cuotas : 0
    ))
   console.log('cont: '+cont + ' total: '+total)

    return +total.toFixed(2)
}