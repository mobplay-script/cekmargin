import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
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
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
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

      <div className="grid content-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-500">
          Simulasi berdasarkan input Anda
        </h3>
        {hasil.valid ? (
          <>
            <ResultRow
              label="Untung sebelum diskon"
              value={formatRupiah(hasil.profitSebelumDiskon)}
            />
            <ResultRow
              label={`Untung setelah diskon ${parseAngka(diskon)}%`}
              value={formatRupiah(hasil.profitSetelahDiskon)}
              emphasis
            />
            <ResultRow
              label="Margin akhir"
              value={formatPersen(hasil.marginSetelahDiskon)}
            />
            <ResultRow
              label="Diskon maksimum aman"
              value={formatPersen(hasil.diskonMaksimumAman)}
            />
            <ResultRow
              label="Titik rugi (diskon)"
              value={formatPersen(hasil.titikRugi)}
            />
            <StatusBadge status={getStatus(hasil.marginSetelahDiskon)} />
          </>
        ) : (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
            {hasil.pesanError ?? "Lengkapi data di sebelah kiri."}
          </p>
        )}
        <p className="text-xs text-slate-400">
          "Diskon maksimum aman" = batas diskon agar margin tetap minimal 5%.
          "Titik rugi" = diskon yang membuat untung jadi nol.
        </p>
      </div>
    </div>
  );
}
