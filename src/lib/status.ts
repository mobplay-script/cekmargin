export type StatusLevel = "aman" | "tipis" | "berisiko" | "rugi";

export interface StatusInfo {
  level: StatusLevel;
  label: string;
  catatan: string;
}

// Ambang status berdasarkan margin akhir (dalam persen, mis. 12 berarti 12%).
export function getStatus(marginPersen: number): StatusInfo {
  if (!Number.isFinite(marginPersen) || marginPersen <= 0) {
    return {
      level: "rugi",
      label: "Rugi",
      catatan:
        "Dengan angka ini Anda menjual rugi. Naikkan harga jual, turunkan biaya, atau kurangi diskon.",
    };
  }
  if (marginPersen < 5) {
    return {
      level: "berisiko",
      label: "Berisiko rugi",
      catatan:
        "Margin sangat kecil. Satu retur atau biaya tak terduga bisa membuat Anda rugi.",
    };
  }
  if (marginPersen < 15) {
    return {
      level: "tipis",
      label: "Tipis",
      catatan:
        "Masih untung, tetapi margin tipis. Hati-hati jika ada retur atau biaya tambahan.",
    };
  }
  return {
    level: "aman",
    label: "Aman",
    catatan: "Margin cukup sehat untuk menutup retur dan biaya kecil tak terduga.",
  };
}
