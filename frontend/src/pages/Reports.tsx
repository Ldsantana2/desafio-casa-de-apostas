import { useEffect, useState } from "react";

import { Header } from "../components/Header";

import { api } from "../services/api";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;

  contacts: Contact[];
}

export function Reports() {
  const [clients, setClients] =
    useState<Client[]>([]);

  async function loadClients() {
    const response = await api.get(
      "/clients"
    );

    setClients(response.data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <Header />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-sky-700 mb-8">
          Relatório de Clientes e Contatos
        </h1>

        <div className="flex flex-col gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-sky-700">
                {client.fullName}
              </h2>

              <p className="text-sky-600 mt-1">
                {client.email}
              </p>

              <p className="text-sky-600">
                {client.phone}
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-sky-700 text-lg mb-3">
                  Contatos
                </h3>

                <div className="flex flex-col gap-3">
                  {client.contacts.map(
                    (contact) => (
                      <div
                        key={contact.id}
                        className="bg-sky-50 border border-sky-100 rounded-xl p-4"
                      >
                        <p className="font-semibold text-sky-800">
                          {contact.fullName}
                        </p>

                        <p className="text-sky-600">
                          {contact.email}
                        </p>

                        <p className="text-sky-600">
                          {contact.phone}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}