export interface FeePreset {
  id: string;
  nama: string;
  // Perkiraan total potongan marketplace dalam persen. Wajib dicek ulang
  // oleh user karena tarif resmi berbeda per kategori & berubah-ubah.
  feePersen: number;
}

export const FEE_PRESETS: FeePreset[] = [
  { id: "shopee", nama: "Shopee (perkiraan)", feePersen: 8 },
  { id: "tokopedia", nama: "Tokopedia (perkiraan)", feePersen: 7 },
  { id: "tiktok", nama: "TikTok Shop (perkiraan)", feePersen: 8 },
];

export const CATATAN_FEE =
  "Angka preset hanya perkiraan. Biaya admin marketplace berbeda per kategori " +
  "dan dapat berubah sewaktu-waktu — sesuaikan dengan tarif terbaru toko Anda.";
