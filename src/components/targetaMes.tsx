import { Targeta } from "@/interfaces/Targeta"


const mesesTotaltes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'noviembre', 'Diciembre']
const mesActual = (new Date()).getMonth()
const meses = mesesTotaltes.slice(mesActual)

interface Props {
    targeta: any
}

export default function TargetaMesPage({targeta}: Props) {
 console.log(targeta)
//funciones
// const calcularTotalMes = (mes: number) => {
//      const total = 0
//      targeta.gastoC.foreach(gastoC =>(

//      ))
// }
//fin funciones

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4x1">
        {
            meses.map((mes, i) =>(
                <div key={i} className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-bold text-gray-800">{mes}</h2>
                </div>
            ))
        }
      </div>
    </div>
  );
}