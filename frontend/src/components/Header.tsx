import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");

    navigate("/");
  }

  return (
    <header className="bg-sky-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Sistema de Clientes
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/clients"
            className="hover:underline"
          >
            Clientes
          </Link>

          <Link
            to="/contacts"
            className="hover:underline"
          >
            Contatos
          </Link>

          <Link
            to="/reports"
            className="hover:underline"
          >
            Relatórios
          </Link>

          <button
            onClick={logout}
            className="bg-white text-sky-600 px-4 py-2 rounded-lg font-semibold hover:bg-sky-100 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}