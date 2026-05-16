import { useState } from "react";
import { trackEvent } from "../lib/analytics";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [error, setError] = useState("");

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid.test(email.trim())) {
      setError("Masukkan alamat email yang benar.");
      return;
    }
    setError("");
    setTerkirim(true);
    trackEvent("newsletter_submit");
  }

  if (terkirim) {
    return (
      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
        <p className="font-semibold">Terima kasih sudah mendaftar.</p>
        <p className="mt-1">
          Email <strong>{email.trim()}</strong> tercatat. Catatan teknis: form
          ini belum terhubung ke layanan pengiriman email — hubungkan ke
          penyedia newsletter Anda sebelum dipakai di produksi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-2 sm:grid-cols-[1fr_auto]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Alamat email Anda"
        className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-teal-700 px-5 py-3 text-base font-semibold text-white hover:bg-teal-800"
      >
        Kirim template gratis
      </button>
      {error && (
        <p className="text-sm text-rose-600 sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
