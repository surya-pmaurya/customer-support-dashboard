import { Search } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";

export default function SearchBar() {
  const searchTerm = useTicketStore((state) => state.searchTerm);
  const setSearchTerm = useTicketStore((state) => state.setSearchTerm);

  return (
    <label className="relative block flex-1">
      <span className="sr-only">Search tickets</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        data-testid="search-input"
        placeholder="Search customer name or ticket subject..."
        className="w-full rounded-xl border border-white/10 bg-[#1E2333] py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-sky-400/50"
      />
    </label>
  );
}