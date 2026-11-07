
import { useMemo, useState } from "react";
import {
    CalendarDays,
    Users,
    MapPin,
    IndianRupee,
    Search,
    FileText,
    ChevronDown,
    ChevronUp,
    Clock,
    Filter,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/organizer/dashboard", icon: CalendarDays },
    { label: "Leads", path: "/organizer/leads", icon: Users },
    { label: "Quotations", path: "/organizer/quotations", icon: FileText },
    { label: "Bookings", path: "/organizer/bookings", icon: CalendarDays },
];

const sampleLeads = [
    {
        id: 1,
        eventName: "Corporate Annual Meeting",
        eventType: "Corporate",
        client: "Rahul Shah",
        date: "2026-12-18",
        location: "Ahmedabad, Gujarat",
        guests: 250,
        budget: 80000,
        description:
            "We need a professional corporate event setup with stage decoration, sound system, lighting, catering, and photography.",
        status: "New",
    },
    {
        id: 2,
        eventName: "Wedding Celebration",
        eventType: "Wedding",
        client: "Priya Patel",
        date: "2026-12-25",
        location: "Rajkot, Gujarat",
        guests: 500,
        budget: 150000,
        description:
            "Looking for complete wedding planning, floral decoration, stage setup, catering, photography, and guest management.",
        status: "New",
    },
    {
        id: 3,
        eventName: "College Fest",
        eventType: "College",
        client: "Amit Joshi",
        date: "2027-01-10",
        location: "Surat, Gujarat",
        guests: 1000,
        budget: 50000,
        description:
            "We need a college fest setup including a main stage, sound, lighting, artist coordination, and event management.",
        status: "Reviewed",
    },
    {
        id: 4,
        eventName: "Birthday Celebration",
        eventType: "Birthday",
        client: "Neha Desai",
        date: "2027-01-20",
        location: "Ahmedabad, Gujarat",
        guests: 100,
        budget: 30000,
        description:
            "A birthday celebration with themed decoration, cake table, photography, music, and catering.",
        status: "New",
    },
];

function OrganizerLeads() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [expandedLead, setExpandedLead] = useState(null);

    const filteredLeads = useMemo(() => {
        return sampleLeads.filter((lead) => {
            const matchesSearch =
                lead.eventName.toLowerCase().includes(search.toLowerCase()) ||
                lead.client.toLowerCase().includes(search.toLowerCase()) ||
                lead.location.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                selectedType === "All" || lead.eventType === selectedType;

            return matchesSearch && matchesType;
        });
    }, [search, selectedType]);

    const formatDate = (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <DashboardLayout
            title="Incoming Leads"
            role="Organizer"
            navItems={navItems}
        >
            {/* Page Heading */}
            <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">
                    Event Requests
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Discover client requirements and review potential event opportunities.
                </p>
            </div>

            {/* Summary */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Total Leads</p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {sampleLeads.length}
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">New Requests</p>
                    <h3 className="mt-2 text-3xl font-bold text-indigo-600">
                        {sampleLeads.filter((lead) => lead.status === "New").length}
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Reviewed Requests</p>
                    <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                        {sampleLeads.filter((lead) => lead.status === "Reviewed").length}
                    </h3>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 px-3">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by event, client, or location..."
                        className="w-full py-3 text-sm outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
                    <Filter size={17} className="text-slate-400" />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="bg-white py-3 text-sm outline-none"
                    >
                        <option value="All">All event types</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Wedding">Wedding</option>
                        <option value="College">College</option>
                        <option value="Birthday">Birthday</option>
                    </select>
                </div>
            </div>

            {/* Leads List */}
            <div className="space-y-4">
                {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => {
                        const isExpanded = expandedLead === lead.id;

                        return (
                            <div
                                key={lead.id}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                            >
                                <div className="p-5">
                                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                                        <div className="min-w-0">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                    {lead.eventType}
                                                </span>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${lead.status === "New"
                                                            ? "bg-amber-50 text-amber-700"
                                                            : "bg-emerald-50 text-emerald-700"
                                                        }`}
                                                >
                                                    {lead.status}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-slate-900">
                                                {lead.eventName}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Requested by {lead.client}
                                            </p>
                                        </div>

                                        <div className="md:text-right">
                                            <p className="text-xs text-slate-500">Client Budget</p>
                                            <p className="mt-1 text-xl font-bold text-slate-900">
                                                ₹{lead.budget.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CalendarDays size={17} className="text-slate-400" />
                                            {formatDate(lead.date)}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin size={17} className="text-slate-400" />
                                            {lead.location}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Users size={17} className="text-slate-400" />
                                            {lead.guests.toLocaleString("en-IN")} guests
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExpandedLead(isExpanded ? null : lead.id)
                                            }
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                        >
                                            {isExpanded ? "Hide details" : "View full requirements"}
                                            {isExpanded ? (
                                                <ChevronUp size={17} />
                                            ) : (
                                                <ChevronDown size={17} />
                                            )}
                                        </button>

                                        <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                                            <Clock size={14} />
                                            Sample request
                                        </span>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                            <h4 className="mb-2 text-sm font-semibold text-slate-800">
                                                Client Requirements
                                            </h4>
                                            <p className="text-sm leading-6 text-slate-600">
                                                {lead.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <Search className="mx-auto mb-3 text-slate-400" size={30} />
                        <h3 className="font-semibold text-slate-800">No leads found</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Try another search term or event category.
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default OrganizerLeads;
