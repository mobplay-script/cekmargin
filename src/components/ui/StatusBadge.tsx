import type { StatusInfo } from "../../lib/status";

const STYLE: Record<
  string,
  { bg: string; fg: string; border: string; icon: string }
> = {
  aman: {
    bg: "#e6f4ea",
    fg: "#137333",
    border: "#a8dabd",
    icon: "check_circle",
  },
  tipis: {
    bg: "#fef7e0",
    fg: "#9a6700",
    border: "#f3d98b",
    icon: "info",
  },
  berisiko: {
    bg: "#feefe3",
    fg: "#9a4a00",
    border: "#f3c592",
    icon: "warning",
  },
  rugi: {
    bg: "#ffdad6",
    fg: "#93000a",
    border: "#f3b3ad",
    icon: "error",
  },
};

export default function StatusBadge({ status }: { status: StatusInfo }) {
  const s = STYLE[status.level];
  return (
    <div
      className="mt-4 flex items-start gap-2 rounded-lg border p-3"
      style={{ backgroundColor: s.bg, borderColor: s.border }}
    >
      <span
        className="material-symbols-outlined fill"
        style={{ color: s.fg }}
        aria-hidden="true"
      >
        {s.icon}
      </span>
      <div style={{ color: s.fg }}>
        <p className="text-xs font-bold tracking-wide uppercase">
          Status: {status.label}
        </p>
        <p className="mt-1 text-sm leading-snug">{status.catatan}</p>
      </div>
    </div>
  );
}
