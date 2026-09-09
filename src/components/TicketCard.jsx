import { CalendarDays, ChevronRight } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";
import { formatDate, getInitials } from "../utils/helpers";
import PriorityBadge from "./PriorityBadge";
import TicketStatusBadge from "./TicketStatusBadge";

export default function TicketCard({ ticket }) {
  const setSelectedTicket = useTicketStore((state) => state.setSelectedTicket);
  const updateTicketStatus = useTicketStore((state) => state.updateTicketStatus);
  const openDetails = () => setSelectedTicket(ticket);

  return (
    <article
      data-testid={`ticket-row-${ticket.id}`}
      className="group rounded-xl border border-white/10 bg-[#13161F] p-4 shadow-lg shadow-black/10 transition-colors hover:bg-[#1A1E2B] hover:border-white/15"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <button type="button" onClick={openDetails} className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sm font-bold text-sky-400 ring-1 ring-sky-400/15">
            {getInitials(ticket.customer.name)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-100">{ticket.customer.name}</p>
            <p className="mt-1 truncate text-sm text-slate-400">{ticket.subject}</p>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2 lg:w-[330px] lg:justify-end">
          <PriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
          <select
            aria-label={`Change status for ${ticket.subject}`}
            value={ticket.status}
            onChange={(event) => updateTicketStatus(ticket.id, event.target.value)}
            className="rounded-lg border border-white/10 bg-[#1E2333] px-2 py-1.5 text-xs font-medium text-slate-300"
          >
            <option>Open</option><option>In Progress</option><option>Resolved</option>
          </select>
        </div>

        <button type="button" onClick={openDetails} className="flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-sky-400">
          <CalendarDays size={16} aria-hidden="true" />
          <span>{formatDate(ticket.createdAt)}</span>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}