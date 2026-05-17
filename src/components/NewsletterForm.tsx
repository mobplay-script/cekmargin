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
          Template profit per produk Anda siap diunduh:
        </p>
        <a
          href="/Template-Profit-per-Produk.xlsx"
          download
          onClick={() => trackEvent("template_gratis_download")}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Download Template (.xlsx)
        </a>
        <p className="mt-3 text-xs text-ink-soft">
          Buka dengan Google Sheets atau Excel. Catatan teknis: email{" "}
          <strong>{email.trim()}</strong> belum dikirim ke layanan newsletter —
          hubungkan penyedia email Anda sebelum dipakai di produksi.
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
