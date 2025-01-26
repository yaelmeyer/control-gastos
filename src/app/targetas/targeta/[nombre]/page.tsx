import { getTargeta, getTargetaAndGastos } from "@/actions/targetas/targetasDAO";
import { Targetas } from "@prisma/client";

interface Props{
    params : {nombre:string}
}

export default async function TargetaPage({params}:Props) {
  const nombre = params.nombre == Targetas.visa ? Targetas.visa : Targetas.master
  const targeta = await getTargetaAndGastos(nombre)
  const fechaActual = new Date()
  const mesActual = new Intl.DateTimeFormat('es-ES', {month:'long'}).format(fechaActual)

  return (
    <div className="text-5xl">
        <span>{targeta?.nombre}</span>
        <span>  {mesActual}</span>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-xl">
              <th className="border border-gray-300 px-4 py-2 text-left">Descripcion</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Monto</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-left">cuotas</th>
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
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  );
}