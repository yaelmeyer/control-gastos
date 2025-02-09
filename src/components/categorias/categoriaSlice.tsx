import { useAppDispatch } from "@/store";
import { addCategoria, deleteCategotia } from "@/store/categorias/categoriasSlice";

interface Props {
    categoria: string
}

export default function CategoriaSlicePage({categoria}: Props) {
    const dispatch = useAppDispatch()
  return (
    <div className="grid grid-cols-1 gap-4">
      <h2>Filtros</h2>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => dispatch(addCategoria(categoria))}>Agregar a filtros</button>
        <button onClick={() => dispatch(deleteCategotia(categoria))}>Eliminar de filtros</button>
      </div>
    </div>
  );
}