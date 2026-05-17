import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
import StatBox from "./ui/StatBox";
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
    <div className="space-y-4">
      <div className="space-y-4 rounded-2xl bg-surface p-4 soft-shadow">
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

      <div className="rounded-2xl border border-primary-container bg-surface p-4 soft-shadow">
        <h3 className="mb-4 text-base font-semibold text-ink">
          Simulasi berdasarkan input Anda
        </h3>
        {hasil.valid ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink-soft">
                Perkiraan harga jual minimum
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatRupiah(hasil.hargaJualMinimum)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatBox
                label="Estimasi untung bersih"
                value={formatRupiah(hasil.profit)}
              />
              <StatBox
                label="Margin akhir"
                value={formatPersen(hasil.marginPersen)}
              />
            </div>
            <div className="space-y-3">
              <ResultRow
                label="Harga setelah diskon"
                value={formatRupiah(hasil.hargaSetelahDiskon)}
              />
              <ResultRow
                label="Batas diskon aman"
                value={formatPersen(hasil.batasDiskonAman)}
              />
            </div>
            <StatusBadge status={getStatus(hasil.marginPersen)} />
            <p className="text-[11px] text-ink-soft italic">
              Rumus: harga jual minimum = (modal + packing + iklan) ÷ ((1 −
              diskon) × (1 − fee − affiliate − target margin)).
            </p>
          </div>
        ) : (
          <p className="rounded-lg bg-surface-low p-3 text-sm text-ink-soft">
            {hasil.pesanError ?? "Lengkapi data di atas."}
          </p>
        )}
      </div>
    </div>
  );
}
