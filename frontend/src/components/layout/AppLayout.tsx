import { NavLink, Outlet } from "react-router-dom";
import { Activity, History, LayoutDashboard, ScanText } from "lucide-react";

const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analyze", label: "Prompt analyzer", icon: ScanText },
  { to: "/history", label: "History", icon: History },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-sm font-bold text-white shadow-lg shadow-violet/20">P</span>
            <span className="font-semibold tracking-tight">PromptLab</span>
          </NavLink>
          <span className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
            <Activity size={14} className="text-emerald-500" />
            Prompt quality workspace
          </span>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col px-5 lg:flex-row lg:px-8">
        <aside className="border-b border-slate-200 py-4 lg:w-56 lg:border-b-0 lg:border-r lg:py-8 lg:pr-5">
          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-violet/10 text-violet" : "text-slate-500 hover:bg-slate-100 hover:text-ink"}`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 py-8 lg:px-10 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
