import Link from "next/link";

export default function SideBarPage() {
  return (
    <nav className="top-4 left-4 h-full bg-gray-800 w-64 shadow-lg">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="mt-4 space-y-4">
            <li>
                <Link href="/targetas" className="block p-2 rounded bg-gray-700 hover:bg-gray-200">Targetas</Link>
            </li>
            <li>
                <Link href="/formularios/newgastoc" className="block p-2 rounded bg-gray-700 hover:bg-gray-200">Nuevo Gasto</Link>
            </li>
            <li>
                <Link href="/categorias" className="block p-2 rounded bg-gray-700 hover:bg-gray-200">categorias</Link>
            </li>
        </ul>
    </nav>
  );
}