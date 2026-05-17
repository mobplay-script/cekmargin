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
      <div className="rounded-lg bg-surface p-4 text-left text-sm text-ink">
        <p className="font-semibold text-primary">Terima kasih sudah mendaftar.</p>
        <p className="mt-1 text-ink-soft">
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
        className="rounded-lg border border-outline-variant bg-surface px-4 py-3 text-base text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        className="rounded-lg bg-surface px-5 py-3 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-surface-container"
      >
        Kirim template gratis
      </button>
      {error && (
        <p className="text-sm text-on-primary-container sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
