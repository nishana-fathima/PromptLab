type StatePanelProps = {
  title: string;
  message: string;
  tone?: "neutral" | "error";
};

export function StatePanel({ title, message, tone = "neutral" }: StatePanelProps) {
  return (
    <div className={`rounded-2xl border p-6 ${tone === "error" ? "border-rose-200 bg-rose-50 text-rose-900" : "border-slate-200 bg-white"}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-75">{message}</p>
    </div>
  );
}
