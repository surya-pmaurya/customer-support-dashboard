const styles = {
  Open: "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  "In Progress": "border border-sky-500/30 bg-sky-500/15 text-sky-400",
  Resolved: "border border-purple-500/30 bg-purple-500/15 text-purple-300",
};

export default function TicketStatusBadge({ status }) {
  return <span data-testid={`status-badge-${status.toLowerCase().replace(/\s+/g, "-")}`} className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}