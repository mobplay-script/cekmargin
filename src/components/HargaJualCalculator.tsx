import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
import StatusBadge from "./ui/StatusBadge";
import { hitungHargaJual } from "../lib/calc";
import { parseAngka, formatRupiah, formatPersen } from "../lib/format";
import { getStatus } from "../lib/status";
import { useTrackPemakaian } from "../lib/analytics";

export default function HargaJualCalculator() {
  const [modal, setModal] = useState("");
  const [packing, setPacking] = useState("");
  const [iklan, setIklan] = useState("");
  const [fee, setFee] = useState("8");
  const [affiliate, setAffiliate] = useState("0");
  const [diskon, setDiskon] = useState("0");
  const [margin, setMargin] = useState("15");

  const hasil = useMemo(
    () =>
      hitungHargaJual({
        modal: parseAngka(modal),
        packing: parseAngka(packing),
        iklan: parseAngka(iklan),
        feePersen: parseAngka(fee),
        affiliatePersen: parseAngka(affiliate),
        diskonPersen: parseAngka(diskon),
        targetMarginPersen: parseAngka(margin),
      }),
    [modal, packing, iklan, fee, affiliate, diskon, margin],
  );

  useTrackPemakaian("harga-jual", hasil.valid);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <NumberInput
          label="Modal produk"
          value={modal}
          onChange={setModal}
          prefix="Rp"
          hint="Harga beli atau biaya produksi per produk."
        />
        <NumberInput
          label="Biaya packing"
          value={packing}
          onChange={setPacking}
          prefix="Rp"
          hint="Kardus, bubble wrap, label, dll. per produk."
        />
        <NumberInput
          label="Biaya iklan per produk"
          value={iklan}
          onChange={setIklan}
          prefix="Rp"
          hint="Perkiraan biaya iklan yang ditanggung tiap produk terjual."
        />
        <FeeSelector value={fee} onChange={setFee} />
        <NumberInput
          label="Komisi affiliate"
          value={affiliate}
          onChange={setAffiliate}
          suffix="%"
          hint="Isi 0 jika tidak memakai affiliate."
        />
        <NumberInput
          label="Diskon yang ingin dipasang"
          value={diskon}
          onChange={setDiskon}
          suffix="%"
          hint="Isi 0 jika menjual tanpa diskon."
        />
        <NumberInput
          label="Target untung (margin)"
          value={margin}
          onChange={setMargin}
          suffix="%"
          hint="Persen untung yang Anda inginkan dari harga jual."
        />
      </div>

      <div className="grid content-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-500">
          Simulasi berdasarkan input Anda
        </h3>
        {hasil.valid ? (
          <>
            <ResultRow
              label="Perkiraan harga jual minimum"
              value={formatRupiah(hasil.hargaJualMinimum)}
              emphasis
            />
            <ResultRow
              label="Harga setelah diskon"
              value={formatRupiah(hasil.hargaSetelahDiskon)}
            />
            <ResultRow
              label="Estimasi untung bersih"
              value={formatRupiah(hasil.profit)}
            />
            <ResultRow
              label="Margin akhir"
              value={formatPersen(hasil.marginPersen)}
            />
            <ResultRow
              label="Batas diskon aman"
              value={formatPersen(hasil.batasDiskonAman)}
            />
            <StatusBadge status={getStatus(hasil.marginPersen)} />
          </>
        ) : (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
            {hasil.pesanError ?? "Lengkapi data di sebelah kiri."}
          </p>
        )}
        <p className="text-xs text-slate-400">
          Rumus: harga jual minimum = (modal + packing + iklan) ÷ ((1 − diskon) ×
          (1 − fee − affiliate − target margin)).
        </p>
      </div>
    </div>
  );
}
