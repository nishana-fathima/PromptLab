import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { StatePanel } from "../components/ui/StatePanel";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

type Overview = { totalPrompts: number; totalExecutions: number; totalTokens: number; recentPrompts: Array<{ title: string; content: string; updatedAt: string }>; recentExecutions: Array<{ output: string; createdAt: string }> };

export function DashboardPage() {
  const overview = useQuery({ queryKey: ["dashboard-overview"], queryFn: () => api<Overview>("/dashboard/overview") });
  const data = overview.data;
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
          <p className="mt-2 text-sm leading-6 text-slate-300">Test, improve, and save prompts with your configured AI provider.</p>
          <ArrowRight className="mt-6 transition group-hover:translate-x-1" size={18} />
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Rubric</p>
          <h2 className="mt-8 font-semibold">Six quality dimensions</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Clarity, specificity, context, completeness, constraints, and output.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Demo status</p>
          <p className="mt-8 flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 size={16} />{overview.isLoading ? "Loading workspace..." : `${data?.totalPrompts ?? 0} saved prompts`}</p>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wider text-slate-400">Executions</p><p className="mt-3 text-3xl font-semibold">{data?.totalExecutions ?? 0}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wider text-slate-400">AI tokens</p><p className="mt-3 text-3xl font-semibold">{data?.totalTokens ?? 0}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wider text-slate-400">Provider</p><p className="mt-3 text-sm font-semibold">Server-configured AI</p></div></section>
      {overview.isError ? <StatePanel tone="error" title="Dashboard unavailable" message="The API could not load workspace metrics. Check the backend and MongoDB configuration." /> : <StatePanel title="Workspace connected" message="PromptLab now uses authenticated server APIs. AI credentials remain server-side and are never sent to the browser." />}
    </div>
  );
}
