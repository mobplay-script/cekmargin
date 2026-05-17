interface Props {
  label: string;
  value: string;
}

export default function ResultRow({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-surface-variant pt-3">
      <span className="text-xs font-semibold tracking-wide text-ink-soft">
        {label}
      </span>
      <span className="text-base font-bold text-primary">{value}</span>
    </div>
  );
}
