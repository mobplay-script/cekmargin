// Semua persen di-input sebagai angka biasa (mis. 8 berarti 8%).
const pct = (n: number) => (Number.isFinite(n) ? n / 100 : 0);

// ----- Inti perhitungan profit -----
// Fee marketplace & komisi affiliate dihitung dari harga yang dibayar pembeli
// (harga setelah diskon).

export interface BiayaInput {
  harga: number; // harga jual yang dipasang
  diskonPersen: number;
  feePersen: number;
  affiliatePersen: number;
  modal: number;
  packing: number;
  iklan: number; // biaya iklan per produk (Rp)
}

export interface HasilProfit {
  hargaSetelahDiskon: number;
  potonganMarketplace: number; // fee + affiliate dalam Rupiah
  totalBiaya: number; // modal + packing + iklan + potongan marketplace
  profit: number;
  marginPersen: number;
}

export function hitungProfit(input: BiayaInput): HasilProfit {
  const d = pct(input.diskonPersen);
  const f = pct(input.feePersen);
  const a = pct(input.affiliatePersen);
  const hargaSetelahDiskon = input.harga * (1 - d);
  const potonganMarketplace = hargaSetelahDiskon * (f + a);
  const biayaTetap = input.modal + input.packing + input.iklan;
  const totalBiaya = potonganMarketplace + biayaTetap;
  const profit = hargaSetelahDiskon - totalBiaya;
  const marginPersen =
    hargaSetelahDiskon > 0 ? (profit / hargaSetelahDiskon) * 100 : 0;
  return { hargaSetelahDiskon, potonganMarketplace, totalBiaya, profit, marginPersen };
}

// ----- Kalkulator 1: Harga Jual Minimum -----

export interface HargaJualInput {
  modal: number;
  packing: number;
  iklan: number;
  feePersen: number;
  affiliatePersen: number;
  diskonPersen: number;
  targetMarginPersen: number;
}

export interface HargaJualHasil {
  valid: boolean;
  pesanError?: string;
  hargaJualMinimum: number;
  hargaSetelahDiskon: number;
  profit: number;
  marginPersen: number;
  batasDiskonAman: number; // persen diskon maksimum agar margin >= 5%
}

const AMBANG_AMAN = 0.05; // 5%

export function hitungHargaJual(input: HargaJualInput): HargaJualHasil {
  const kosong: HargaJualHasil = {
    valid: false,
    hargaJualMinimum: 0,
    hargaSetelahDiskon: 0,
    profit: 0,
    marginPersen: 0,
    batasDiskonAman: 0,
  };

  const biayaTetap = input.modal + input.packing + input.iklan;
  const d = pct(input.diskonPersen);
  const f = pct(input.feePersen);
  const a = pct(input.affiliatePersen);
  const m = pct(input.targetMarginPersen);

  if (biayaTetap <= 0) {
    return { ...kosong, pesanError: "Isi modal produk terlebih dahulu." };
  }
  if (d >= 1) {
    return { ...kosong, pesanError: "Diskon tidak boleh 100% atau lebih." };
  }
  const sisa = 1 - f - a - m;
  if (sisa <= 0) {
    return {
      ...kosong,
      pesanError:
        "Fee + komisi affiliate + target margin terlalu besar (≥ 100%). Turunkan salah satunya.",
    };
  }

  const hargaJualMinimum = biayaTetap / ((1 - d) * sisa);
  const hasil = hitungProfit({
    harga: hargaJualMinimum,
    diskonPersen: input.diskonPersen,
    feePersen: input.feePersen,
    affiliatePersen: input.affiliatePersen,
    modal: input.modal,
    packing: input.packing,
    iklan: input.iklan,
  });

  // Diskon maksimum agar margin tetap >= 5% pada harga jual minimum tsb.
  const penyebut = 1 - f - a - AMBANG_AMAN;
  let batasDiskonAman = 0;
  if (penyebut > 0) {
    const satuMinusD = biayaTetap / (hargaJualMinimum * penyebut);
    batasDiskonAman = Math.max(0, Math.min(100, (1 - satuMinusD) * 100));
  }

  return {
    valid: true,
    hargaJualMinimum,
    hargaSetelahDiskon: hasil.hargaSetelahDiskon,
    profit: hasil.profit,
    marginPersen: hasil.marginPersen,
    batasDiskonAman,
  };
}

// ----- Kalkulator 2: Diskon Agar Tetap Untung -----

export interface DiskonInput {
  hargaNormal: number;
  modal: number;
  packing: number;
  iklan: number;
  feePersen: number;
  affiliatePersen: number;
  diskonPersen: number;
}

export interface DiskonHasil {
  valid: boolean;
  pesanError?: string;
  profitSebelumDiskon: number;
  profitSetelahDiskon: number;
  marginSetelahDiskon: number;
  diskonMaksimumAman: number; // persen, margin >= 5%
  titikRugi: number; // persen diskon saat profit = 0
}

export function hitungDiskon(input: DiskonInput): DiskonHasil {
  const kosong: DiskonHasil = {
    valid: false,
    profitSebelumDiskon: 0,
    profitSetelahDiskon: 0,
    marginSetelahDiskon: 0,
    diskonMaksimumAman: 0,
    titikRugi: 0,
  };

  if (input.hargaNormal <= 0) {
    return { ...kosong, pesanError: "Isi harga jual normal terlebih dahulu." };
  }

  const f = pct(input.feePersen);
  const a = pct(input.affiliatePersen);
  const biayaTetap = input.modal + input.packing + input.iklan;

  const sebelum = hitungProfit({ ...input, harga: input.hargaNormal, diskonPersen: 0 });
  const sesudah = hitungProfit({ ...input, harga: input.hargaNormal });

  // Titik rugi: diskon saat profit = 0.
  const sisaRugi = 1 - f - a;
  let titikRugi = 0;
  if (sisaRugi > 0) {
    const satuMinusD = biayaTetap / (input.hargaNormal * sisaRugi);
    titikRugi = Math.max(0, Math.min(100, (1 - satuMinusD) * 100));
  }

  // Diskon maksimum aman: margin >= 5%.
  const sisaAman = 1 - f - a - AMBANG_AMAN;
  let diskonMaksimumAman = 0;
  if (sisaAman > 0) {
    const satuMinusD = biayaTetap / (input.hargaNormal * sisaAman);
    diskonMaksimumAman = Math.max(0, Math.min(100, (1 - satuMinusD) * 100));
  }

  return {
    valid: true,
    profitSebelumDiskon: sebelum.profit,
    profitSetelahDiskon: sesudah.profit,
    marginSetelahDiskon: sesudah.marginPersen,
    diskonMaksimumAman,
    titikRugi,
  };
}

// ----- Kalkulator 3: Iklan vs Profit -----

export interface IklanInput {
  biayaIklan: number;
  omzet: number;
  jumlahOrder: number;
  modalPerProduk: number;
  feePersen: number;
}

export interface IklanHasil {
  valid: boolean;
  pesanError?: string;
  profit: number;
  biayaIklanPerOrder: number;
  roas: number;
  marginPersen: number;
}

export function hitungIklan(input: IklanInput): IklanHasil {
  const kosong: IklanHasil = {
    valid: false,
    profit: 0,
    biayaIklanPerOrder: 0,
    roas: 0,
    marginPersen: 0,
  };

  if (input.omzet <= 0) {
    return { ...kosong, pesanError: "Isi omzet terlebih dahulu." };
  }
  if (input.jumlahOrder <= 0) {
    return { ...kosong, pesanError: "Isi jumlah order terlebih dahulu." };
  }

  const modalTotal = input.modalPerProduk * input.jumlahOrder;
  const feeTotal = pct(input.feePersen) * input.omzet;
  const profit = input.omzet - modalTotal - feeTotal - input.biayaIklan;
  const biayaIklanPerOrder = input.biayaIklan / input.jumlahOrder;
  const roas = input.biayaIklan > 0 ? input.omzet / input.biayaIklan : Infinity;
  const marginPersen = (profit / input.omzet) * 100;

  return { valid: true, profit, biayaIklanPerOrder, roas, marginPersen };
}
