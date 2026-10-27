import { Eraser, FileText, Lightbulb, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

const examplePrompt = "Build a responsive React dashboard for tracking monthly engineering metrics. Use TypeScript and Tailwind CSS, include loading and error states, and provide accessible components with tests.";

type PromptEditorProps = {
  prompt: string;
  loading: boolean;
  validationError: string | null;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
};

export function PromptEditor({ prompt, loading, validationError, onPromptChange, onSubmit }: PromptEditorProps) {
  const [showExample, setShowExample] = useState(false);
  const canSubmit = prompt.trim().length > 0 && !loading;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) onSubmit();
  }

  function loadExample() {
    onPromptChange(examplePrompt);
    setShowExample(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet"><FileText size={17} /><span className="font-mono text-xs uppercase tracking-[0.18em]">Prompt input</span></div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">What are you asking AI to build?</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Be as specific as you can. PromptLab will identify useful gaps without assuming context you did not provide.</p>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] text-slate-500 sm:inline-flex">TEXT / CODE</span>
      </div>
      <div className="mt-6">
        <label htmlFor="prompt-input" className="sr-only">Coding prompt</label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          disabled={loading}
          rows={10}
          maxLength={20000}
          placeholder="Example: Build a React checkout form that validates billing details, handles API errors, and includes accessible loading states..."
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? "prompt-error" : "prompt-help"}
          className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-sm leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-violet focus:bg-white focus:ring-4 focus:ring-violet/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-400">
          <p id="prompt-help">Paste a prompt or start from an example.</p>
          <span aria-live="polite" className="font-mono">{prompt.length.toLocaleString()} / 20,000</span>
        </div>
        {validationError && <p id="prompt-error" role="alert" className="mt-2 text-sm font-medium text-rose-600">{validationError}</p>}
      </div>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <button type="button" onClick={() => setShowExample((current) => !current)} disabled={loading} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-4 focus:ring-violet/10 disabled:opacity-50">
            <Lightbulb size={16} /> Use an example
          </button>
          {showExample && <div className="absolute bottom-12 left-0 z-10 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xl shadow-slate-200/70 sm:w-96"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Starter prompt</p><p className="mt-2 text-sm leading-6 text-slate-600">{examplePrompt}</p><button type="button" onClick={loadExample} className="mt-3 text-sm font-semibold text-violet hover:text-violet/80">Load example</button></div>}
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button type="button" onClick={() => onPromptChange("")} disabled={loading || prompt.length === 0} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-violet/10 disabled:cursor-not-allowed disabled:opacity-40"><Eraser size={16} />Clear</button>
          <button type="submit" disabled={!canSubmit} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition hover:bg-violet/90 focus:outline-none focus:ring-4 focus:ring-violet/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
            {loading ? <><LoaderCircle size={17} className="animate-spin" />Analyzing Prompt...</> : <><Sparkles size={17} />Analyze Prompt</>}
          </button>
        </div>
      </div>
    </form>
  );
}
