interface Props {
  label: string;
  value: string;
  emphasis?: boolean;
}

export default function ResultRow({ label, value, emphasis }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-2 last:border-b-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span
        className={
          emphasis
            ? "text-lg font-bold text-teal-700"
            : "text-base font-semibold text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
