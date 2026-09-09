import { CheckCircle2, CircleDot, Clock3, Ticket } from "lucide-react";

const cards = [
  { key: "total", label: "Total Tickets", icon: Ticket, iconClass: "text-blue-400 bg-blue-500/10" },
  { key: "Open", label: "Open", icon: CircleDot, iconClass: "text-emerald-400 bg-emerald-500/10" },
  { key: "In Progress", label: "In Progress", icon: Clock3, iconClass: "text-sky-400 bg-sky-500/10" },
  { key: "Resolved", label: "Resolved", icon: CheckCircle2, iconClass: "text-purple-400 bg-purple-500/10" },
];

export default function StatsCards({ tickets }) {
  const counts = tickets.reduce(
    (result, ticket) => {
      result.total += 1;
      result[ticket.status] += 1;
      return result;
    },
    { total: 0, Open: 0, "In Progress": 0, Resolved: 0 }
  );

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, iconClass }) => (
        <article
          key={key}
          data-testid={`stat-card-${key.toLowerCase().replace(/\s+/g, "-")}`}
          className="rounded-2xl border border-white/10 bg-[#13161F] p-5 shadow-xl shadow-black/10 transition-colors hover:bg-[#1A1E2B]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-50">{counts[key]}</p>
            </div>
            <div className={`rounded-xl p-3 ${iconClass}`}>
              <Icon size={21} aria-hidden="true" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}