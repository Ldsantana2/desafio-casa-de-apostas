import { useEffect, useState } from "react";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { ClientForm } from "../components/ClientForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export function Clients() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  async function loadClients() {
    const response = await api.get(
      "/clients"
    );

    setClients(response.data);
  }

async function createClient(data: {
  fullName: string;
  email: string;
  phone: string;
}) {
  try {
    if (editingClient) {
      await api.put(
        `/clients/${editingClient.id}`,
        data
      );

      toast.success(
        "Cliente atualizado!"
      );

      setEditingClient(null);
    } else {
      await api.post("/clients", data);

      toast.success(
        "Cliente criado!"
      );
    }

    loadClients();
  } catch (error: any) {
    toast.error(
      error.response?.data?.error ||
        "Erro ao salvar cliente"
    );
  }
}

async function deleteClient(id: string) {
  const result = await Swal.fire({
    title: "Excluir cliente?",
    text:
      "Essa ação não poderá ser desfeita.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#e11d48",

    cancelButtonColor: "#0ea5e9",

    confirmButtonText: "Excluir",

    cancelButtonText: "Cancelar",
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/clients/${id}`);

    toast.success(
      "Cliente excluído!"
    );

    loadClients();
  } catch {
    toast.error(
      "Erro ao excluir cliente"
    );
  }
}

  function handleEdit(client: Client) {
    setEditingClient(client);
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <Header />

      <div className="max-w-6xl mx-auto p-8">
        <ClientForm
          onSubmit={createClient}
          editingClient={editingClient}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-sky-700">
                    {client.fullName}
                  </h2>

                  <p className="text-sky-600 mt-1">
                    {client.email}
                  </p>

                  <p className="text-sky-600">
                    {client.phone}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(client)
                    }
                    className="bg-white text-sky-600 px-4 py-2 rounded-lg font-semibold hover:bg-sky-100 transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      deleteClient(client.id)
                    }
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}