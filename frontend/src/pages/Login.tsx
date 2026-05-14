import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      if (isRegister) {
        await api.post("/auth/register", {
          email,
          password,
        });

        alert("Usuário criado com sucesso!");

        setIsRegister(false);

        return;
      }

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/clients");
    } catch (error) {
      alert("Erro ao autenticar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister
            ? "Criar Conta"
            : "Login"}
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded"
          >
            {isRegister
              ? "Criar Conta"
              : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() =>
              setIsRegister(!isRegister)
            }
            className="text-blue-600"
          >
            {isRegister
              ? "Já tenho conta"
              : "Criar conta"}
          </button>
        </div>
      </form>
    </div>
  );
}