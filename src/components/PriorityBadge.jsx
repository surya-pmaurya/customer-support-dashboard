const styles = {
  Low: "border border-slate-400/20 bg-slate-500/15 text-slate-300",
  Medium: "border border-amber-500/30 bg-amber-500/15 text-amber-300",
  High: "border border-red-500/30 bg-red-500/15 text-red-300",
};

export default function PriorityBadge({ priority }) {
  return <span data-testid={`priority-badge-${priority.toLowerCase()}`} className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[priority]}`}>{priority}</span>;
}