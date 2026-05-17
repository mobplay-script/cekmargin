import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
import StatBox from "./ui/StatBox";
import StatusBadge from "./ui/StatusBadge";
import { hitungDiskon } from "../lib/calc";
import { parseAngka, formatRupiah, formatPersen } from "../lib/format";
import { getStatus } from "../lib/status";
import { useTrackPemakaian } from "../lib/analytics";

export default function DiskonAmanCalculator() {
  const [harga, setHarga] = useState("");
  const [modal, setModal] = useState("");
  const [packing, setPacking] = useState("");
  const [iklan, setIklan] = useState("");
  const [fee, setFee] = useState("8");
  const [affiliate, setAffiliate] = useState("0");
  const [diskon, setDiskon] = useState("20");

  const hasil = useMemo(
    () =>
      hitungDiskon({
        hargaNormal: parseAngka(harga),
        modal: parseAngka(modal),
        packing: parseAngka(packing),
        iklan: parseAngka(iklan),
        feePersen: parseAngka(fee),
        affiliatePersen: parseAngka(affiliate),
        diskonPersen: parseAngka(diskon),
      }),
    [harga, modal, packing, iklan, fee, affiliate, diskon],
  );

  useTrackPemakaian("diskon-aman", hasil.valid);

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-2xl bg-surface p-4 soft-shadow">
        <NumberInput
          label="Harga jual normal"
          value={harga}
          onChange={setHarga}
          prefix="Rp"
          hint="Harga sebelum diskon."
        />
        <NumberInput
          label="Modal produk"
          value={modal}
          onChange={setModal}
          prefix="Rp"
        />
        <NumberInput
          label="Biaya packing"
          value={packing}
          onChange={setPacking}
          prefix="Rp"
        />
        <NumberInput
          label="Biaya iklan per produk"
          value={iklan}
          onChange={setIklan}
          prefix="Rp"
          hint="Isi 0 jika tidak beriklan."
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
          label="Diskon yang ingin diuji"
          value={diskon}
          onChange={setDiskon}
          suffix="%"
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
                Untung setelah diskon {parseAngka(diskon)}%
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatRupiah(hasil.profitSetelahDiskon)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatBox
                label="Untung sebelum diskon"
                value={formatRupiah(hasil.profitSebelumDiskon)}
              />
              <StatBox
                label="Margin akhir"
                value={formatPersen(hasil.marginSetelahDiskon)}
              />
            </div>
            <div className="space-y-3">
              <ResultRow
                label="Diskon maksimum aman"
                value={formatPersen(hasil.diskonMaksimumAman)}
              />
              <ResultRow
                label="Titik rugi (diskon)"
                value={formatPersen(hasil.titikRugi)}
              />
            </div>
            <StatusBadge status={getStatus(hasil.marginSetelahDiskon)} />
            <p className="text-[11px] text-ink-soft italic">
              "Diskon maksimum aman" = batas diskon agar margin tetap minimal
              5%. "Titik rugi" = diskon yang membuat untung jadi nol.
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
