export default function Loading() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#13161F] p-10">
      <div className="flex min-h-[220px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-sky-400" />
          <p className="mt-4 text-sm text-slate-400">Loading tickets...</p>
        </div>
      </div>
    </div>
  );
}