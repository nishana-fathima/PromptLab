import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { StatePanel } from "../components/ui/StatePanel";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">AI prompt quality checker</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Make every prompt easier to execute.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">PromptLab helps you turn vague coding requests into clear, useful instructions. The analyzer experience will be added in the next implementation phase.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Link to="/analyze" className="group rounded-2xl bg-ink p-6 text-white shadow-xl shadow-slate-300/40 transition hover:-translate-y-0.5">
          <Sparkles className="text-violet-300" size={22} />
          <h2 className="mt-8 font-semibold">Start an analysis</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Open the placeholder analyzer workspace.</p>
          <ArrowRight className="mt-6 transition group-hover:translate-x-1" size={18} />
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Rubric</p>
          <h2 className="mt-8 font-semibold">Six quality dimensions</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Clarity, specificity, context, completeness, constraints, and output.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Demo status</p>
          <p className="mt-8 flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 size={16} />Local demo engine ready</p>
        </div>
      </section>
      <StatePanel title="Presentation-ready demo" message="Prompt analysis and history run locally in your browser. No backend, API key, or external service is required." />
    </div>
  );
}
