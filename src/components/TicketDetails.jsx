import { X, Mail, Clock, MessageSquare } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";
import { formatDateTime, getInitials } from "../utils/helpers";
import PriorityBadge from "./PriorityBadge";
import TicketStatusBadge from "./TicketStatusBadge";

export default function TicketDetails() {
  const ticket = useTicketStore((state) => state.selectedTicket);
  const setSelectedTicket = useTicketStore((state) => state.setSelectedTicket);
  const updateTicketStatus = useTicketStore((state) => state.updateTicketStatus);
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close ticket details" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
      <aside role="dialog" aria-modal="true" aria-labelledby="ticket-details-title" data-testid="ticket-drawer" className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-white/10 bg-[#11141D] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">Ticket #{ticket.id}</p>
            <h2 id="ticket-details-title" className="mt-1 text-xl font-bold text-slate-50">{ticket.subject}</h2>
          </div>
          <button type="button" onClick={() => setSelectedTicket(null)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white" aria-label="Close"><X size={22} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <section className="rounded-xl border border-white/10 bg-[#13161F] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/10 font-bold text-sky-400 ring-1 ring-sky-400/15">{getInitials(ticket.customer.name)}</div>
              <div>
                <h3 className="font-semibold text-slate-100">{ticket.customer.name}</h3>
                <a href={`mailto:${ticket.customer.email}`} className="flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300"><Mail size={14} />{ticket.customer.email}</a>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="font-bold text-slate-100">Issue details</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{ticket.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <PriorityBadge priority={ticket.priority} />
              <TicketStatusBadge status={ticket.status} />
              <select aria-label="Change ticket status" value={ticket.status} onChange={(event) => updateTicketStatus(ticket.id, event.target.value)} className="rounded-lg border border-white/10 bg-[#1E2333] px-2 py-1 text-xs text-slate-300">
                <option>Open</option><option>In Progress</option><option>Resolved</option>
              </select>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Clock size={16} />Created {formatDateTime(ticket.createdAt)}</p>
          </section>

          <section className="mt-7">
            <div className="flex items-center gap-2"><MessageSquare size={18} className="text-sky-400" /><h3 className="font-bold text-slate-100">Conversation</h3></div>
            <div className="mt-4 space-y-4">
              {ticket.messages.map((message) => (
                <div key={message.id} className={`max-w-[88%] rounded-2xl border p-3 text-sm ${message.sender === "support" ? "ml-auto border-blue-500/25 bg-blue-600 text-white" : "border-white/10 bg-[#1E2333] text-slate-300"}`}>
                  <p className="mb-1 text-xs font-semibold opacity-75">{message.sender === "support" ? "Support team" : ticket.customer.name}</p>
                  <p className="leading-5">{message.message}</p>
                  <p className="mt-2 text-[11px] opacity-60">{formatDateTime(message.timestamp)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}