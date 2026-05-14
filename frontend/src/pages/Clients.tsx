import { useEffect, useState } from "react";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { ClientForm } from "../components/ClientForm";

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
    if (editingClient) {
      await api.put(
        `/clients/${editingClient.id}`,
        data
      );

      setEditingClient(null);
    } else {
      await api.post("/clients", data);
    }

    loadClients();
  }

  async function deleteClient(id: string) {
    const confirmDelete = confirm(
      "Deseja excluir este cliente?"
    );

    if (!confirmDelete) return;

    await api.delete(`/clients/${id}`);

    loadClients();
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