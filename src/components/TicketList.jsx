import TicketCard from "./TicketCard";

export default function TicketList({ tickets }) {
  return (
    <section aria-label="Support tickets" className="rounded-2xl border border-white/10 bg-[#13161F] p-4 shadow-xl shadow-black/10 sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">Support queue</p>
          <h2 className="mt-1 text-lg font-bold text-slate-50">Support Tickets</h2>
        </div>
        <p className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-400">{tickets.length} shown</p>
      </div>
      <div className="space-y-3">{tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}</div>
    </section>
  );
}