import { getTargetaAndGastos } from "@/actions/targetas/targetasDAO";
import TargetaMesPage from "@/components/targetaMes";
import { Targetas } from "@prisma/client";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";

interface Props{
    params : {nombre:string}
}

export default async function TargetaPage({params}:Props) {
  const param = await params
  const nombre = param.nombre == Targetas.visa ? Targetas.visa : Targetas.master
  const targeta = await getTargetaAndGastos(nombre)
  const fechaActual = new Date()
  const mesActual = new Intl.DateTimeFormat('es-ES', {month:'long'}).format(fechaActual)

//funciones
const calcularDisponibilidad=():number=>{
  const total = targeta!.gastosC
      .map((gastoc:any) => gastoc.gasto.monto)
      .reduce((sum:number, monto:number) => sum + monto, 0)
  
      return total
}
//fin funciones

  return (
    <div className="text-5xl">
      <div className="flex items-center">
        <span>{targeta?.nombre}  </span>
        <span>  {mesActual}</span>
        <div className="ml-auto text-right">
          <span className="text-2xl">Limite: {targeta?.limite}</span>
          <span className="text-2xl">  Disponibilidad: {targeta?.limite! - calcularDisponibilidad()}</span>
        </div>
      </div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-xl">
              <th className="border border-gray-300 px-4 py-2 text-left">Descripcion</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Monto</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-left">cuotas</th>
              <th className="border border-gray-300 px-4 py-2 text-left">cuota Actual</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Editar</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              targeta?.gastosC.map(gastoC =>(
                <tr key={gastoC.id} className="hover:bg-gray-100 text-lg">
                  <td className="border border-gray-300 px-4 py-2">{gastoC.gasto?.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2">${gastoC.gasto?.monto}</td>
                  <td className="border border-gray-300 px-4 py-2">{gastoC.gasto?.fecha.toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{gastoC.cuotas}</td>
                  <td className="border border-gray-300 px-4 py-2">{gastoC.cuotaActual}</td>
                  <td className="border border-gray-300 px-4 py-2"><Link href={`/formularios/newgastoc?update=1&idGastoC=${gastoC.id}`}><CiEdit/></Link></td>
                  <td className="border border-gray-300 px-4 py-2"><RiDeleteBin2Line/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <hr />
        <TargetaMesPage targeta={targeta}></TargetaMesPage>
    </div>
  );
}