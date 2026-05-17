import { useMemo, useState } from "react";
import NumberInput from "./ui/NumberInput";
import FeeSelector from "./ui/FeeSelector";
import ResultRow from "./ui/ResultRow";
import StatBox from "./ui/StatBox";
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
    <div className="space-y-4">
      <div className="space-y-4 rounded-2xl bg-surface p-4 soft-shadow">
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

      <div className="rounded-2xl border border-primary-container bg-surface p-4 soft-shadow">
        <h3 className="mb-4 text-base font-semibold text-ink">
          Simulasi berdasarkan input Anda
        </h3>
        {hasil.valid ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink-soft">
                Estimasi untung bersih setelah iklan
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatRupiah(hasil.profit)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatBox
                label="Biaya iklan per order"
                value={formatRupiah(hasil.biayaIklanPerOrder)}
              />
              <StatBox
                label="ROAS"
                value={
                  Number.isFinite(hasil.roas)
                    ? `${formatAngka(hasil.roas)}x`
                    : "-"
                }
              />
            </div>
            <div className="space-y-3">
              <ResultRow
                label="Margin setelah iklan"
                value={formatPersen(hasil.marginPersen)}
              />
            </div>
            <StatusBadge status={getStatus(hasil.marginPersen)} />
            <p className="text-[11px] text-ink-soft italic">
              Untung bersih = omzet − (modal × order) − fee marketplace − biaya
              iklan. Omzet naik belum tentu untung ikut naik.
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
