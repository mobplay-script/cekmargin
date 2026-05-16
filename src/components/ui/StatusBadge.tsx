import type { StatusInfo } from "../../lib/status";

const STYLE: Record<string, string> = {
  aman: "bg-emerald-100 text-emerald-800 border-emerald-300",
  tipis: "bg-amber-100 text-amber-800 border-amber-300",
  berisiko: "bg-orange-100 text-orange-800 border-orange-300",
  rugi: "bg-rose-100 text-rose-800 border-rose-300",
};

export default function StatusBadge({ status }: { status: StatusInfo }) {
  return (
    <div className={`rounded-lg border p-3 ${STYLE[status.level]}`}>
      <p className="text-sm font-semibold uppercase tracking-wide">
        Status: {status.label}
      </p>
      <p className="mt-1 text-sm">{status.catatan}</p>
    </div>
  );
}
