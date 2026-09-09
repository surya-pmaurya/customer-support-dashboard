import { RotateCcw } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";
import SearchBar from "./SearchBar";

export default function FilterBar() {
  const statusFilter = useTicketStore((state) => state.statusFilter);
  const priorityFilter = useTicketStore((state) => state.priorityFilter);
  const setStatusFilter = useTicketStore((state) => state.setStatusFilter);
  const setPriorityFilter = useTicketStore((state) => state.setPriorityFilter);
  const clearFilters = useTicketStore((state) => state.clearFilters);

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#13161F] p-4 shadow-xl shadow-black/10 lg:flex-row">
      <SearchBar />
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          data-testid="status-filter-select"
          className="rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-slate-200"
        >
          <option>All</option><option>Open</option><option>In Progress</option><option>Resolved</option>
        </select>
        <select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          data-testid="priority-filter-select"
          className="rounded-xl border border-white/10 bg-[#1E2333] px-3 py-2.5 text-sm text-slate-200"
        >
          <option>All</option><option>Low</option><option>Medium</option><option>High</option>
        </select>
        <button
          type="button"
          onClick={clearFilters}
          data-testid="reset-filters-button"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </div>
    </section>
  );
}