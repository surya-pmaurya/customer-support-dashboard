import { Headphones } from "lucide-react";
import NewTicketModal from "./NewTicketModal";

export default function Header() {
  return (
    <header data-testid="app-header" className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0D12]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-blue-400/20 bg-blue-500/15 p-2.5 text-sky-400 shadow-lg shadow-blue-950/20">
            <Headphones size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              PulseSupport
            </p>
            <h1 className="text-lg font-bold tracking-tight text-slate-50">
              Customer Support
            </h1>
          </div>
        </div>
        <NewTicketModal />
      </div>
    </header>
  );
}