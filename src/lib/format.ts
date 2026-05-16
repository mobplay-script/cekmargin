export function formatRupiah(value: number): string {
  if (!Number.isFinite(value)) return "-";
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toLocaleString("id-ID");
  return `${sign}Rp${digits}`;
}

export function formatPersen(value: number, desimal = 1): string {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(desimal).replace(".", ",")}%`;
}

export function formatAngka(value: number, desimal = 2): string {
  if (!Number.isFinite(value)) return "-";
  return value.toFixed(desimal).replace(".", ",");
}

// Mengubah string input bebas ("Rp10.000", "10000", "") menjadi angka.
export function parseAngka(raw: string): number {
  if (typeof raw !== "string") return 0;
  const bersih = raw.replace(/[^0-9,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const num = parseFloat(bersih);
  return Number.isFinite(num) ? num : 0;
}
