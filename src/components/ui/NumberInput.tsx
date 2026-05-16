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
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100">
        {prefix && (
          <span className="pl-3 text-sm text-slate-500">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-3 text-base outline-none"
        />
        {suffix && (
          <span className="pr-3 text-sm text-slate-500">{suffix}</span>
        )}
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
