"use client";

import { useState } from "react";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
        }),
      });

      if (!res.ok) throw new Error("Kunne ikke opprette bruker");

      setSuccess("Bruker opprettet!");
      setName("");
      setEmail("");
      setRole("user");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Ny bruker</h1>

      <form onSubmit={createUser} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Navn</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">E‑post</label>
          <input
            type="email"
            className="border rounded-md p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rolle</label>
          <select
            className="border rounded-md p-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Bruker</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Passord</label>
          <input
            type="password"
            className="border rounded-md p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Opprett bruker"}
        </button>
      </form>
    </div>
  );
}
