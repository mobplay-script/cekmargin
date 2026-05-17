interface Props {
  label: string;
  value: string;
}

// Kotak statistik untuk grid hasil kalkulator.
export default function StatBox({ label, value }: Props) {
  return (
    <div className="rounded-lg bg-surface-low p-3">
      <p className="text-xs font-semibold tracking-wide text-ink-soft">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-ink">{value}</p>
    </div>
  );
}
