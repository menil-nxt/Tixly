
import {
    CalendarDays,
    Users,
    FileText,
    MessageSquare,
    Clock,
    ArrowUpRight,
    CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/organizer/dashboard", icon: CalendarDays },
    { label: "Leads", path: "/organizer/leads", icon: Users },
    { label: "Quotations", path: "/organizer/quotations", icon: FileText },
    { label: "Bookings", path: "/organizer/bookings", icon: CalendarDays },
    { label: "Messages", path: "/organizer/messages", icon: MessageSquare },
];

const stats = [
    { label: "New Leads", value: "12", icon: Users },
    { label: "Quotes Sent", value: "08", icon: FileText },
    { label: "Confirmed Bookings", value: "05", icon: CheckCircle },
];

function OrganizerDashboard() {
    const leads = [
        {
            event: "Corporate Annual Meeting",
            client: "Rahul Shah",
            date: "18 December 2026",
            budget: "₹50,000 - ₹80,000",
        },
        {
            event: "Wedding Celebration",
            client: "Priya Patel",
            date: "25 December 2026",
            budget: "₹1,00,000 - ₹1,50,000",
        },
        {
            event: "College Fest",
            client: "Amit Joshi",
            date: "10 January 2027",
            budget: "₹30,000 - ₹50,000",
        },
    ];

    return (
        <DashboardLayout
            title="Organizer Overview"
            role="Organizer"
            navItems={navItems}
        >
            {/* Welcome Section */}
            <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white md:flex-row md:items-center">
                <div>
                    <p className="text-sm text-slate-300">Your business workspace</p>
                    <h2 className="mt-2 text-2xl font-bold">Welcome, Organizer!</h2>
                    <p className="mt-2 text-sm text-slate-300">
                        Manage your event leads and grow your business with Tixly.
                    </p>
                </div>

                <Link
                    to="/organizer/leads"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                    View Leads <ArrowUpRight size={17} />
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

            {/* Incoming Leads */}
            <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <div>
                        <h3 className="font-bold text-slate-900">Recent Leads</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Event requests from potential clients.
                        </p>
                    </div>
                    <Link to="/organizer/leads" className="text-sm font-semibold text-indigo-600">
                        View all
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                        <div key={lead.event} className="p-5">
                            <div className="flex flex-col justify-between gap-3 sm:flex-row">
                                <div>
                                    <h4 className="font-semibold text-slate-800">{lead.event}</h4>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Client: {lead.client}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Event date: {lead.date}
                                    </p>
                                </div>

                                <div className="sm:text-right">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {lead.budget}
                                    </p>
                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                                        <Clock size={13} /> New lead
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default OrganizerDashboard;
