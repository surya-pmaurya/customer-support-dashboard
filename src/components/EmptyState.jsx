import { Inbox } from "lucide-react";
export default function EmptyState({ filtered }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#13161F] p-12 text-center">
      <Inbox className="mx-auto text-slate-600" size={42} />
      <h2 className="mt-4 font-bold text-slate-100">{filtered ? "No matching tickets" : "No tickets yet"}</h2>
      <p className="mt-1 text-sm text-slate-500">{filtered ? "Try changing your search or filters." : "Tickets will appear here when customer requests are received."}</p>
    </div>
  );
}