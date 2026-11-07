
import {
  CalendarDays,
  FileText,
  MessageSquare,
  Plus,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
  { label: "Overview", path: "/client/dashboard", icon: CalendarDays },
  { label: "My Events", path: "/client/events", icon: CalendarDays },
  { label: "Quotations", path: "/client/quotations", icon: FileText },
  { label: "Messages", path: "/client/messages", icon: MessageSquare },
];

const stats = [
  { label: "Total Events", value: "04", icon: CalendarDays },
  { label: "Quotations Received", value: "08", icon: FileText },
  { label: "Pending Requests", value: "02", icon: Clock },
];

function ClientDashboard() {
  return (
    <DashboardLayout
      title="Client Overview"
      role="Client"
      navItems={navItems}
    >
      {/* Welcome Section */}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/client/create-event"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          <Plus size={17} />
          Create Event Request
        </Link>

        <Link
          to="/explore"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          Explore Organizers
          <ArrowUpRight size={17} />
        </Link>
      </div>


      {/* Statistics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h3>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Events Section */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h3 className="font-bold text-slate-900">Recent Events</h3>
            <p className="mt-1 text-sm text-slate-500">
              A quick look at your event activity.
            </p>
          </div>
          <Link to="/client/events" className="text-sm font-semibold text-indigo-600">
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { name: "College Annual Function", date: "20 December 2026", status: "Quotation received" },
            { name: "Birthday Celebration", date: "05 January 2027", status: "Pending" },
            { name: "Corporate Meetup", date: "15 February 2027", status: "Planning" },
          ].map((event) => (
            <div
              key={event.name}
              className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <h4 className="font-semibold text-slate-800">{event.name}</h4>
                <p className="mt-1 text-sm text-slate-500">{event.date}</p>
              </div>
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <Link
        to="/client/create-event"
        className="mt-6 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-5 text-sm font-semibold text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
      >
        <Plus size={19} /> Find an organizer for a new event
      </Link>
    </DashboardLayout>
  );
}

export default ClientDashboard;
