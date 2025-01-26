import { getAllTargetas, getTargeta } from "@/actions/targetas/targetasDAO";
import { TargetaCard } from "@/components/targetaCard";
import { Targeta } from "@/interfaces/Targeta";
import { Targetas } from "@prisma/client";

export default async function TargetaCPage() {
    // const targetaObtenida = await getTargeta(Targetas.visa)
    const targetasObtenidas = await getAllTargetas()
    // console.log(targeta)
    const targetas = targetasObtenidas?.map((targeta) => ({
            nombre          : targeta!.nombre,
            cierre          : targeta!.cierre,
            vencimiento     : targeta!.vencimiento,
            limite          : targeta!.limite,
            disponibilidad  : targeta!.disponibilidad
    }))

  return (
    <div>
      {/* {JSON.stringify(targeta)} */}
      {
        targetas?.map(targeta => (
            <TargetaCard key={targeta.nombre} targeta={targeta}/>
        ))
      }
      
    </div>
  );
}