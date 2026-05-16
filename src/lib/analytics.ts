import { useEffect, useRef } from "react";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Aman dipanggil walau GA4 belum dikonfigurasi: tanpa gtag, fungsi ini diam.
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

// Mencatat satu event "kalkulator_dipakai" saat user benar-benar mendapat
// hasil valid, bukan sekadar membuka halaman. Hanya dikirim sekali per kunjungan.
export function useTrackPemakaian(namaKalkulator: string, valid: boolean): void {
  const sudahTerkirim = useRef(false);

  useEffect(() => {
    if (!valid || sudahTerkirim.current) return;
    const timer = setTimeout(() => {
      sudahTerkirim.current = true;
      trackEvent("kalkulator_dipakai", { kalkulator: namaKalkulator });
    }, 1500);
    return () => clearTimeout(timer);
  }, [valid, namaKalkulator]);
}
