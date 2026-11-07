import React, { useMemo, useState } from "react";
import {
    CalendarDays,
    MapPin,
    Users,
    IndianRupee,
    Search,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    Clock3,
    ClipboardList,
    Building2,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/organizer/dashboard", icon: Building2 },
    { label: "Leads", path: "/organizer/leads", icon: ClipboardList },
    { label: "Quotations", path: "/organizer/quotations", icon: IndianRupee },
    { label: "Bookings", path: "/organizer/bookings", icon: CalendarDays },
];

const initialBookings = [
    {
        id: 1,
        eventName: "Corporate Annual Meeting",
        client: "Rahul Sharma",
        email: "rahul@example.com",
        date: "2026-12-18",
        location: "Ahmedabad",
        guests: 250,
        budget: 80000,
        stage: "Planning",
        description:
            "Annual corporate gathering with stage setup, catering, decorations and guest management.",
        checklist: [
            "Venue confirmation",
            "Catering arrangements",
            "Stage and decoration",
            "Guest invitations",
        ],
    },
    {
        id: 2,
        eventName: "Wedding Celebration",
        client: "Priya Patel",
        email: "priya@example.com",
        date: "2026-12-22",
        location: "Rajkot",
        guests: 500,
        budget: 150000,
        stage: "Confirmed",
        description:
            "A wedding celebration requiring decoration, photography, catering and entertainment.",
        checklist: [
            "Venue confirmation",
            "Photography team",
            "Decoration planning",
            "Catering arrangements",
        ],
    },
    {
        id: 3,
        eventName: "College Technology Fest",
        client: "Amit Joshi",
        email: "amit@example.com",
        date: "2026-11-25",
        location: "Surat",
        guests: 800,
        budget: 100000,
        stage: "Ready",
        description:
            "A college technology festival with multiple activity zones and a main stage.",
        checklist: [
            "Venue confirmation",
            "Technical equipment",
            "Activity zones",
            "Volunteer coordination",
        ],
    },
    {
        id: 4,
        eventName: "Birthday Celebration",
        client: "Neha Shah",
        email: "neha@example.com",
        date: "2026-11-30",
        location: "Ahmedabad",
        guests: 100,
        budget: 30000,
        stage: "Completed",
        description:
            "Birthday party with themed decoration, food and entertainment.",
        checklist: [
            "Venue confirmation",
            "Decoration completed",
            "Food arrangements",
            "Event completed",
        ],
    },
];

const stages = ["Confirmed", "Planning", "Ready", "Completed"];

const stageProgress = {
    Confirmed: 10,
    Planning: 45,
    Ready: 85,
    Completed: 100,
};

const stageStyles = {
    Confirmed: "bg-blue-50 text-blue-700",
    Planning: "bg-amber-50 text-amber-700",
    Ready: "bg-purple-50 text-purple-700",
    Completed: "bg-green-50 text-green-700",
};

const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

export default function OrganizerBookings() {
    const [bookings, setBookings] = useState(initialBookings);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [expandedId, setExpandedId] = useState(null);

    const filters = ["All", ...stages];

    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const matchesFilter =
                activeFilter === "All" || booking.stage === activeFilter;

            const searchText =
                `${booking.eventName} ${booking.client} ${booking.location}`.toLowerCase();

            return matchesFilter && searchText.includes(search.toLowerCase());
        });
    }, [bookings, activeFilter, search]);

    const updateStage = (id, newStage) => {
        setBookings((current) =>
            current.map((booking) =>
                booking.id === id ? { ...booking, stage: newStage } : booking
            )
        );
    };

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(
        (booking) => booking.stage !== "Completed"
    ).length;
    const completedBookings = bookings.filter(
        (booking) => booking.stage === "Completed"
    ).length;

    const totalValue = bookings.reduce(
        (total, booking) => total + booking.budget,
        0
    );

    return (
        <DashboardLayout navItems={navItems}>
            <div className="space-y-7">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-indigo-600">
                            Organizer Workspace
                        </p>
                        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Bookings Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Manage confirmed events and keep track of your event planning.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                        <CalendarDays size={18} />
                        <span>{totalBookings} total bookings</span>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Bookings"
                        value={totalBookings}
                        icon={CalendarDays}
                        color="bg-indigo-50 text-indigo-600"
                    />
                    <StatCard
                        title="Active Events"
                        value={activeBookings}
                        icon={Clock3}
                        color="bg-amber-50 text-amber-600"
                    />
                    <StatCard
                        title="Completed Events"
                        value={completedBookings}
                        icon={CheckCircle2}
                        color="bg-green-50 text-green-600"
                    />
                    <StatCard
                        title="Total Booking Value"
                        value={formatCurrency(totalValue)}
                        icon={IndianRupee}
                        color="bg-purple-50 text-purple-600"
                    />
                </div>

                {/* Search and filters */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="relative max-w-md">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search event, client or location..."
                            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeFilter === filter
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Booking cards */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">
                            Your Event Bookings
                        </h2>
                        <span className="text-sm text-gray-500">
                            {filteredBookings.length} results
                        </span>
                    </div>

                    {filteredBookings.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
                            <CalendarDays
                                size={36}
                                className="mx-auto text-gray-300"
                            />
                            <h3 className="mt-3 font-semibold text-gray-800">
                                No bookings found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) : (
                        filteredBookings.map((booking) => {
                            const isExpanded = expandedId === booking.id;
                            const progress = stageProgress[booking.stage];

                            return (
                                <div
                                    key={booking.id}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-indigo-200"
                                >
                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {booking.eventName}
                                                    </h3>
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[booking.stage]}`}
                                                    >
                                                        {booking.stage}
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-sm text-gray-500">
                                                    Client:{" "}
                                                    <span className="font-medium text-gray-700">
                                                        {booking.client}
                                                    </span>
                                                </p>

                                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500">
                                                    <span className="flex items-center gap-2">
                                                        <CalendarDays size={16} />
                                                        {formatDate(booking.date)}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <MapPin size={16} />
                                                        {booking.location}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Users size={16} />
                                                        {booking.guests} guests
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 lg:min-w-44 lg:flex-col lg:items-end">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Booking value
                                                    </p>
                                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                                        {formatCurrency(booking.budget)}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        setExpandedId(isExpanded ? null : booking.id)
                                                    }
                                                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    {isExpanded ? "Hide Details" : "View Details"}
                                                    {isExpanded ? (
                                                        <ChevronUp size={16} />
                                                    ) : (
                                                        <ChevronDown size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="mt-6">
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="font-medium text-gray-700">
                                                    Planning Progress
                                                </span>
                                                <span className="font-semibold text-indigo-600">
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Expanded details */}
                                        {isExpanded && (
                                            <div className="mt-6 border-t border-gray-100 pt-6">
                                                <div className="grid gap-6 lg:grid-cols-2">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            Event Information
                                                        </h4>
                                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                                            {booking.description}
                                                        </p>
                                                        <p className="mt-4 text-sm text-gray-600">
                                                            Client email:{" "}
                                                            <span className="font-medium text-gray-800">
                                                                {booking.email}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            Event Checklist
                                                        </h4>
                                                        <ul className="mt-3 space-y-3">
                                                            {booking.checklist.map((item, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                                >
                                                                    <CheckCircle2
                                                                        size={17}
                                                                        className={
                                                                            booking.stage === "Completed"
                                                                                ? "text-green-500"
                                                                                : "text-gray-300"
                                                                        }
                                                                    />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                                                    <label
                                                        htmlFor={`stage-${booking.id}`}
                                                        className="mb-2 block text-sm font-semibold text-gray-800"
                                                    >
                                                        Update Booking Stage
                                                    </label>
                                                    <select
                                                        id={`stage-${booking.id}`}
                                                        value={booking.stage}
                                                        onChange={(e) =>
                                                            updateStage(booking.id, e.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
                                                    >
                                                        {stages.map((stage) => (
                                                            <option key={stage} value={stage}>
                                                                {stage}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Changing the stage automatically updates the
                                                        planning progress.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <p className="text-center text-xs text-gray-400">
                    Demo bookings are stored in temporary React state. Changes will reset
                    when you refresh the page.
                </p>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`rounded-xl p-3 ${color}`}>
                    <Icon size={22} />
                </div>
            </div>
        </div>
    );
}