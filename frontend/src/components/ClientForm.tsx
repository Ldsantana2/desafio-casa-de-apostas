import { useEffect, useState } from "react";

interface Client {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
}

interface ClientFormProps {
  onSubmit: (data: Client) => void;

  editingClient: Client | null;
}

export function ClientForm({
  onSubmit,
  editingClient,
}: ClientFormProps) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    if (editingClient) {
      setFullName(
        editingClient.fullName
      );

      setEmail(editingClient.email);

      setPhone(editingClient.phone);
    }
  }, [editingClient]);

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onSubmit({
      fullName,
      email,
      phone,
    });

    setFullName("");
    setEmail("");
    setPhone("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-sky-700">
        {editingClient
          ? "Editar Cliente"
          : "Novo Cliente"}
      </h2>

      <input
        placeholder="Nome completo"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
        className="border border-sky-200 p-3 rounded-lg outline-none focus:border-sky-500"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border border-sky-200 p-3 rounded-lg outline-none focus:border-sky-500"
      />

      <input
        placeholder="Telefone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="border border-sky-200 p-3 rounded-lg outline-none focus:border-sky-500"
      />

      <button className="bg-sky-500 hover:bg-sky-600 transition text-white p-3 rounded-lg font-semibold">
        {editingClient
          ? "Atualizar Cliente"
          : "Salvar Cliente"}
      </button>
    </form>
  );
}