import { useEffect, useState } from "react";

import { Header } from "../components/Header";

import { api } from "../services/api";

interface Client {
  id: string;
  fullName: string;
}

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;

  client: Client;
}

export function Contacts() {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [editingContact, setEditingContact] =
    useState<Contact | null>(null);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [clientId, setClientId] =
    useState("");

  async function loadClients() {
    const response = await api.get(
      "/clients"
    );

    setClients(response.data);
  }

  async function loadContacts() {
    const response = await api.get(
      "/contacts"
    );

    setContacts(response.data);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const data = {
      fullName,
      email,
      phone,
      clientId,
    };

    if (editingContact) {
      await api.put(
        `/contacts/${editingContact.id}`,
        data
      );

      setEditingContact(null);
    } else {
      await api.post("/contacts", data);
    }

    setFullName("");
    setEmail("");
    setPhone("");
    setClientId("");

    loadContacts();
  }

  async function deleteContact(id: string) {
    const confirmDelete = confirm(
      "Deseja excluir este contato?"
    );

    if (!confirmDelete) return;

    await api.delete(`/contacts/${id}`);

    loadContacts();
  }

  function handleEdit(contact: Contact) {
    setEditingContact(contact);

    setFullName(contact.fullName);
    setEmail(contact.email);
    setPhone(contact.phone);

    setClientId(contact.client.id);
  }

  useEffect(() => {
    loadClients();
    loadContacts();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <Header />

      <div className="max-w-6xl mx-auto p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-sky-700">
            {editingContact
              ? "Editar Contato"
              : "Novo Contato"}
          </h2>

          <input
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="border border-sky-200 p-3 rounded-lg outline-none"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-sky-200 p-3 rounded-lg outline-none"
          />

          <input
            placeholder="Telefone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border border-sky-200 p-3 rounded-lg outline-none"
          />

          <select
            value={clientId}
            onChange={(e) =>
              setClientId(e.target.value)
            }
            className="border border-sky-200 p-3 rounded-lg outline-none"
          >
            <option value="">
              Selecione um cliente
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.fullName}
              </option>
            ))}
          </select>

          <button className="bg-sky-500 hover:bg-sky-600 transition text-white p-3 rounded-lg font-semibold">
            {editingContact
              ? "Atualizar Contato"
              : "Salvar Contato"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-sky-700">
                    {contact.fullName}
                  </h2>

                  <p className="text-sky-600">
                    {contact.email}
                  </p>

                  <p className="text-sky-600">
                    {contact.phone}
                  </p>

                  <p className="mt-3 text-sm text-sky-500">
                    Cliente:
                    {" "}
                    {contact.client.fullName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(contact)
                    }
                    className="bg-white text-sky-600 px-4 py-2 rounded-lg font-semibold hover:bg-sky-100 transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      deleteContact(contact.id)
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