import { FEE_PRESETS, CATATAN_FEE } from "../../lib/presets";
import NumberInput from "./NumberInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FeeSelector({ value, onChange }: Props) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink">
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
                "rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-colors " +
                (aktif
                  ? "border-primary bg-primary-container text-on-primary-container"
                  : "border-outline-variant bg-surface text-ink-soft hover:bg-surface-variant")
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
      <p className="mt-1 text-[11px] text-ink-soft">{CATATAN_FEE}</p>
    </div>
  );
}
