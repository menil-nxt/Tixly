
import { NavLink } from "react-router-dom";
import { CalendarDays, LogOut } from "lucide-react";

function DashboardLayout({ title, role, navItems, children }) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <aside className="w-full border-b border-slate-200 bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-indigo-600" size={27} />
            <span className="text-2xl font-bold text-slate-900">Tixly</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{role} Dashboard</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-3 md:block md:space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-100 p-4 md:block">
          <NavLink
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
          >
            <LogOut size={18} />
            Sign out
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 md:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome to your Tixly workspace.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            {role === "Client" ? "C" : "O"}
          </div>
        </header>

        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
