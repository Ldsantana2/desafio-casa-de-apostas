import { useState } from "react";

interface ContactFormProps {
  clientId: string;

  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    clientId: string;
  }) => void;
}

export function ContactForm({
  clientId,
  onSubmit,
}: ContactFormProps) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onSubmit({
      fullName,
      email,
      phone,
      clientId,
    });

    setFullName("");
    setEmail("");
    setPhone("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mt-4"
    >
      <input
        placeholder="Nome contato"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
        className="border p-2 rounded"
      />

      <input
        placeholder="Email contato"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-2 rounded"
      />

      <input
        placeholder="Telefone contato"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="border p-2 rounded"
      />

      <button className="bg-blue-600 text-white p-2 rounded">
        Adicionar Contato
      </button>
    </form>
  );
}