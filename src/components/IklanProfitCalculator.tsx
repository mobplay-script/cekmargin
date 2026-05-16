import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
import StatusBadge from "./ui/StatusBadge";
import { hitungIklan } from "../lib/calc";
import { parseAngka, formatRupiah, formatPersen, formatAngka } from "../lib/format";
import { getStatus } from "../lib/status";
import { useTrackPemakaian } from "../lib/analytics";

export default function IklanProfitCalculator() {
  const [biayaIklan, setBiayaIklan] = useState("");
  const [omzet, setOmzet] = useState("");
  const [order, setOrder] = useState("");
  const [modal, setModal] = useState("");
  const [fee, setFee] = useState("8");

  const hasil = useMemo(
    () =>
      hitungIklan({
        biayaIklan: parseAngka(biayaIklan),
        omzet: parseAngka(omzet),
        jumlahOrder: parseAngka(order),
        modalPerProduk: parseAngka(modal),
        feePersen: parseAngka(fee),
      }),
    [biayaIklan, omzet, order, modal, fee],
  );

  useTrackPemakaian("iklan-profit", hasil.valid);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <NumberInput
          label="Total biaya iklan"
          value={biayaIklan}
          onChange={setBiayaIklan}
          prefix="Rp"
          hint="Total uang iklan yang dikeluarkan pada periode ini."
        />
        <NumberInput
          label="Total omzet dari iklan"
          value={omzet}
          onChange={setOmzet}
          prefix="Rp"
          hint="Total penjualan yang dihasilkan iklan."
        />
        <NumberInput
          label="Jumlah order"
          value={order}
          onChange={setOrder}
          hint="Berapa pesanan yang masuk dari iklan."
        />
        <NumberInput
          label="Modal produk per order"
          value={modal}
          onChange={setModal}
          prefix="Rp"
          hint="Rata-rata modal produk untuk tiap pesanan."
        />
        <FeeSelector value={fee} onChange={setFee} />
      </div>

      <div className="grid content-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-500">
          Simulasi berdasarkan input Anda
        </h3>
        {hasil.valid ? (
          <>
            <ResultRow
              label="Estimasi untung bersih setelah iklan"
              value={formatRupiah(hasil.profit)}
              emphasis
            />
            <ResultRow
              label="Biaya iklan per order"
              value={formatRupiah(hasil.biayaIklanPerOrder)}
            />
            <ResultRow
              label="ROAS (omzet ÷ biaya iklan)"
              value={
                Number.isFinite(hasil.roas) ? `${formatAngka(hasil.roas)}x` : "-"
              }
            />
            <ResultRow
              label="Margin setelah iklan"
              value={formatPersen(hasil.marginPersen)}
            />
            <StatusBadge status={getStatus(hasil.marginPersen)} />
          </>
        ) : (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
            {hasil.pesanError ?? "Lengkapi data di sebelah kiri."}
          </p>
        )}
        <p className="text-xs text-slate-400">
          Untung bersih = omzet − (modal × order) − fee marketplace − biaya iklan.
          Omzet naik belum tentu untung ikut naik.
        </p>
      </div>
    </div>
  );
}
