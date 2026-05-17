interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  placeholder = "0",
}: Props) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-outline-variant bg-surface transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        {prefix && (
          <span className="pl-3 text-sm text-ink-soft">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-3 text-base text-ink outline-none"
        />
        {suffix && (
          <span className="pr-3 text-sm text-ink-soft">{suffix}</span>
        )}
      </div>
      {hint && (
        <span className="mt-1 block text-[11px] text-ink-soft">{hint}</span>
      )}
    </label>
  );
}
