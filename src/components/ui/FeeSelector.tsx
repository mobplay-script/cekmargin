import { FEE_PRESETS, CATATAN_FEE } from "../../lib/presets";
import NumberInput from "./NumberInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FeeSelector({ value, onChange }: Props) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        Fee marketplace
      </span>
      <div className="mb-2 flex flex-wrap gap-2">
        {FEE_PRESETS.map((preset) => {
          const aktif = value === String(preset.feePersen);
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(String(preset.feePersen))}
              className={
                "rounded-lg border px-3 py-2 text-sm " +
                (aktif
                  ? "border-teal-600 bg-teal-50 font-medium text-teal-700"
                  : "border-slate-300 bg-white text-slate-600")
              }
            >
              {preset.nama}
            </button>
          );
        })}
      </div>
      <NumberInput
        label="Atau isi manual (% dari harga setelah diskon)"
        value={value}
        onChange={onChange}
        suffix="%"
      />
      <p className="mt-1 text-xs text-slate-500">{CATATAN_FEE}</p>
    </div>
  );
}
