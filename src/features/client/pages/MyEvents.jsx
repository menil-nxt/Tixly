
import { useState } from "react";
import {
    LayoutDashboard,
    CalendarDays,
    FileText,
    MessageSquare,
    MapPin,
    Users,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    ChevronDown,
    ChevronUp,
    PartyPopper,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/client/dashboard", icon: LayoutDashboard },
    { label: "My Events", path: "/client/events", icon: CalendarDays },
    { label: "Quotations", path: "/client/quotations", icon: FileText },
    { label: "Messages", path: "/client/messages", icon: MessageSquare },
];

const initialEvents = [
    {
        id: 1,
        name: "Corporate Annual Meeting",
        type: "Corporate",
        date: "2026-12-18",
        location: "Ahmedabad, Gujarat",
        guests: 250,
        budget: 80000,
        organizer: "Elite Events Studio",
        status: "Confirmed",
        description:
            "Annual corporate gathering with stage decoration, professional lighting, sound equipment, catering and photography.",
        progress: 75,
        steps: [
            { label: "Request Submitted", completed: true },
            { label: "Quotation Accepted", completed: true },
            { label: "Planning in Progress", completed: true },
            { label: "Event Completed", completed: false },
        ],
    },
    {
        id: 2,
        name: "Birthday Celebration",
        type: "Birthday",
        date: "2026-12-25",
        location: "Rajkot, Gujarat",
        guests: 100,
        budget: 30000,
        organizer: "Dream Events",
        status: "Pending",
        description:
            "Birthday party with themed decoration, photography, music and catering.",
        progress: 25,
        steps: [
            { label: "Request Submitted", completed: true },
            { label: "Quotation Accepted", completed: false },
            { label: "Planning in Progress", completed: false },
            { label: "Event Completed", completed: false },
        ],
    },
    {
        id: 3,
        name: "College Technology Fest",
        type: "College",
        date: "2026-10-20",
        location: "Surat, Gujarat",
        guests: 800,
        budget: 100000,
        organizer: "Creative Event Management",
        status: "Completed",
        description:
            "A technology festival featuring a main stage, technical workshops, competitions and entertainment.",
        progress: 100,
        steps: [
            { label: "Request Submitted", completed: true },
            { label: "Quotation Accepted", completed: true },
            { label: "Planning in Progress", completed: true },
            { label: "Event Completed", completed: true },
        ],
    },
    {
        id: 4,
        name: "Product Launch Event",
        type: "Product Launch",
        date: "2027-01-15",
        location: "Ahmedabad, Gujarat",
        guests: 300,
        budget: 120000,
        organizer: "Royal Celebration Planners",
        status: "Confirmed",
        description:
            "Product launch with stage design, LED screens, lighting, photography and guest management.",
        progress: 50,
        steps: [
            { label: "Request Submitted", completed: true },
            { label: "Quotation Accepted", completed: true },
            { label: "Planning in Progress", completed: false },
            { label: "Event Completed", completed: false },
        ],
    },
];

const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-amber-50 text-amber-700",
        Confirmed: "bg-indigo-50 text-indigo-700",
        Completed: "bg-green-50 text-green-700",
        Cancelled: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}

export default function MyEvents() {
    const [events, setEvents] = useState(initialEvents);
    const [filter, setFilter] = useState("All");
    const [expandedId, setExpandedId] = useState(null);

    const updateStatus = (id, status) => {
        setEvents((previous) =>
            previous.map((event) =>
                event.id === id ? { ...event, status } : event
            )
        );
    };

    const filteredEvents =
        filter === "All"
            ? events
            : events.filter((event) => event.status === filter);

    const counts = {
        total: events.length,
        pending: events.filter((e) => e.status === "Pending").length,
        confirmed: events.filter((e) => e.status === "Confirmed").length,
        completed: events.filter((e) => e.status === "Completed").length,
    };

    const formatDate = (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <DashboardLayout
            title="My Events"
            role="Client"
            navItems={navItems}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            My Events
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage and track all your event requests and bookings.
                        </p>
                    </div>

                    <a
                        href="/client/create-event"
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        + Create New Event
                    </a>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[
                        { label: "Total Events", value: counts.total, color: "text-slate-900" },
                        { label: "Pending", value: counts.pending, color: "text-amber-600" },
                        { label: "Confirmed", value: counts.confirmed, color: "text-indigo-600" },
                        { label: "Completed", value: counts.completed, color: "text-green-600" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-slate-200 bg-white p-5"
                        >
                            <p className="text-sm text-slate-500">{item.label}</p>
                            <p className={`mt-2 text-3xl font-bold ${item.color}`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">
                        Your Event List
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {filters.map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${filter === item
                                        ? "bg-indigo-600 text-white"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Cards */}
                <div className="space-y-4">
                    {filteredEvents.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                            <PartyPopper className="mx-auto mb-3 text-slate-300" size={36} />
                            <h3 className="font-semibold text-slate-800">
                                No events found
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                No events match the selected status.
                            </p>
                        </div>
                    ) : (
                        filteredEvents.map((event) => {
                            const expanded = expandedId === event.id;

                            return (
                                <div
                                    key={event.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <div className="p-5">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                        {event.type}
                                                    </span>
                                                    <StatusBadge status={event.status} />
                                                </div>

                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {event.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Organizer: {event.organizer}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Estimated Budget
                                                </p>
                                                <p className="mt-1 text-xl font-bold text-slate-900">
                                                    {formatPrice(event.budget)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <CalendarDays size={17} className="text-slate-400" />
                                                {formatDate(event.date)}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin size={17} className="text-slate-400" />
                                                {event.location}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Users size={17} className="text-slate-400" />
                                                {event.guests.toLocaleString("en-IN")} Guests
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        {event.status !== "Cancelled" && (
                                            <div className="mt-5">
                                                <div className="mb-2 flex justify-between text-xs">
                                                    <span className="font-semibold text-slate-600">
                                                        Planning Progress
                                                    </span>
                                                    <span className="font-semibold text-indigo-600">
                                                        {event.progress}%
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-indigo-600 transition-all"
                                                        style={{ width: `${event.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Expand and actions */}
                                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                            <button
                                                onClick={() =>
                                                    setExpandedId(expanded ? null : event.id)
                                                }
                                                className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                            >
                                                <Eye size={16} />
                                                {expanded ? "Hide Details" : "View Details"}
                                                {expanded ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )}
                                            </button>

                                            {event.status === "Pending" && (
                                                <button
                                                    onClick={() => updateStatus(event.id, "Cancelled")}
                                                    className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                                >
                                                    <XCircle size={16} />
                                                    Cancel Request
                                                </button>
                                            )}
                                        </div>

                                        {/* Expanded details */}
                                        {expanded && (
                                            <div className="mt-5 space-y-5 rounded-xl bg-slate-50 p-4">
                                                <div>
                                                    <h4 className="mb-2 text-sm font-bold text-slate-800">
                                                        Event Description
                                                    </h4>
                                                    <p className="text-sm leading-6 text-slate-600">
                                                        {event.description}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="mb-3 text-sm font-bold text-slate-800">
                                                        Event Planning Timeline
                                                    </h4>

                                                    <div className="space-y-3">
                                                        {event.steps.map((step, index) => (
                                                            <div
                                                                key={step.label}
                                                                className="flex items-center gap-3"
                                                            >
                                                                {step.completed ? (
                                                                    <CheckCircle2
                                                                        size={19}
                                                                        className="shrink-0 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Clock
                                                                        size={19}
                                                                        className="shrink-0 text-slate-400"
                                                                    />
                                                                )}

                                                                <span
                                                                    className={`text-sm ${step.completed
                                                                            ? "font-medium text-slate-800"
                                                                            : "text-slate-400"
                                                                        }`}
                                                                >
                                                                    {step.label}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
