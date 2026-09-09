import { useEffect, useMemo } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import FilterBar from "./components/FilterBar";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";
import Loading from "./components/Loading";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import { useTicketStore } from "./store/ticketStore";

export default function App() {
  const tickets = useTicketStore((state) => state.tickets);
  const loading = useTicketStore((state) => state.loading);
  const error = useTicketStore((state) => state.error);
  const searchTerm = useTicketStore((state) => state.searchTerm);
  const statusFilter = useTicketStore((state) => state.statusFilter);
  const priorityFilter = useTicketStore((state) => state.priorityFilter);
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const clearError = useTicketStore((state) => state.clearError);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = !search ||
        ticket.customer.name.toLowerCase().includes(search) ||
        ticket.subject.toLowerCase().includes(search);
      return matchesSearch &&
        (statusFilter === "All" || ticket.status === statusFilter) &&
        (priorityFilter === "All" || ticket.priority === priorityFilter);
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const hasActiveFilters = Boolean(searchTerm.trim()) || statusFilter !== "All" || priorityFilter !== "All";

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100">
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Command center</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-50">Support overview</h2>
          <p className="mt-1 text-sm text-slate-400">Monitor customer requests and keep every ticket moving.</p>
        </div>

        <StatsCards tickets={tickets} />
        <FilterBar />

        {loading ? <Loading /> : error && tickets.length === 0 ? (
          <ErrorState message={error} onRetry={fetchTickets} />
        ) : (
          <>
            {error && (
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                <div className="flex items-center justify-between gap-4">
                  <span>{error}</span>
                  <button type="button" onClick={clearError} className="font-semibold text-amber-100 underline">Dismiss</button>
                </div>
              </div>
            )}
            {tickets.length === 0 ? <EmptyState filtered={false} /> :
             filteredTickets.length === 0 ? <EmptyState filtered={hasActiveFilters} /> :
             <TicketList tickets={filteredTickets} />}
          </>
        )}
      </main>
      <TicketDetails />
    </div>
  );
}