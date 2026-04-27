export default function StatCard({ label, value }) {
  return (
    <div className="flex flex-col">
      <div className="font-mono text-3xl md:text-5xl text-main-text tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim-text">
        {label}
      </div>
    </div>
  );
}
