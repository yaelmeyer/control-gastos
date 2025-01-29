import { getAllTargetas, getTargeta } from "@/actions/targetas/targetasDAO";
import { TargetaCard } from "@/components/targetaCard";
import TargetasPage from '../../components/targetas';

export default async function TargetaCPage() {

    const targetasObtenidas = await getAllTargetas()

    const targetas = targetasObtenidas?.map((targeta) => ({
            nombre          : targeta!.nombre,
            cierre          : targeta!.cierre,
            vencimiento     : targeta!.vencimiento,
            limite          : targeta!.limite,
            disponibilidad  : targeta!.disponibilidad
    }))

  return (
    <div>
        <TargetasPage targetas={targetas!} />
    </div>
  );
}