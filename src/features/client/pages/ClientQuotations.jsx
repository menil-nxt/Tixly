
import { useState } from "react";
import {
    LayoutDashboard,
    CalendarDays,
    FileText,
    MessageSquare,
    MapPin,
    Users,
    IndianRupee,
    Clock3,
    CheckCircle2,
    XCircle,
    ChevronDown,
    ChevronUp,
    Star,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/client/dashboard", icon: LayoutDashboard },
    { label: "My Events", path: "/client/events", icon: CalendarDays },
    { label: "Quotations", path: "/client/quotations", icon: FileText },
    { label: "Messages", path: "/client/messages", icon: MessageSquare },
];

const initialQuotations = [
    {
        id: 1,
        organizer: "Elite Events Studio",
        eventName: "Corporate Annual Meeting",
        eventDate: "December 15, 2026",
        location: "Ahmedabad",
        guests: 250,
        rating: 4.8,
        submitted: "November 5, 2026",
        validUntil: "November 15, 2026",
        total: 75000,
        status: "Pending",
        services: [
            { name: "Venue Decoration", amount: 20000 },
            { name: "Sound & Lighting", amount: 18000 },
            { name: "Catering", amount: 25000 },
            { name: "Photography", amount: 12000 },
        ],
        notes: "Complete event management with professional coordination.",
    },
    {
        id: 2,
        organizer: "Dream Events & Weddings",
        eventName: "Corporate Annual Meeting",
        eventDate: "December 15, 2026",
        location: "Ahmedabad",
        guests: 250,
        rating: 4.6,
        submitted: "November 4, 2026",
        validUntil: "November 14, 2026",
        total: 68000,
        status: "Pending",
        services: [
            { name: "Venue Decoration", amount: 18000 },
            { name: "Sound & Lighting", amount: 15000 },
            { name: "Catering", amount: 25000 },
            { name: "Photography", amount: 10000 },
        ],
        notes: "An affordable package with all essential event services.",
    },
    {
        id: 3,
        organizer: "Royal Celebration Planners",
        eventName: "Corporate Annual Meeting",
        eventDate: "December 15, 2026",
        location: "Ahmedabad",
        guests: 250,
        rating: 4.9,
        submitted: "November 3, 2026",
        validUntil: "November 13, 2026",
        total: 82000,
        status: "Pending",
        services: [
            { name: "Venue Decoration", amount: 22000 },
            { name: "Sound & Lighting", amount: 20000 },
            { name: "Catering", amount: 28000 },
            { name: "Photography", amount: 12000 },
        ],
        notes: "Premium event experience with upgraded decoration and equipment.",
    },
];

const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-amber-50 text-amber-700",
        Accepted: "bg-green-50 text-green-700",
        Rejected: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}

export default function ClientQuotations() {
    const [quotations, setQuotations] = useState(initialQuotations);
    const [filter, setFilter] = useState("All");
    const [expandedId, setExpandedId] = useState(null);

    const updateStatus = (id, newStatus) => {
        setQuotations((current) =>
            current.map((quotation) =>
                quotation.id === id
                    ? { ...quotation, status: newStatus }
                    : quotation
            )
        );
    };

    const filteredQuotations =
        filter === "All"
            ? quotations
            : quotations.filter((quotation) => quotation.status === filter);

    const pendingCount = quotations.filter(
        (quotation) => quotation.status === "Pending"
    ).length;

    return (
        <DashboardLayout
            title="My Quotations"
            role="Client"
            navItems={navItems}
        >
            <div className="space-y-6">
                {/* Page heading */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Received Quotations
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Compare offers from event organizers and choose the best one.
                    </p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Total Quotations</p>
                            <FileText className="text-indigo-600" size={20} />
                        </div>
                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {quotations.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Pending Review</p>
                            <Clock3 className="text-amber-600" size={20} />
                        </div>
                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {pendingCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Accepted</p>
                            <CheckCircle2 className="text-green-600" size={20} />
                        </div>
                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {quotations.filter((q) => q.status === "Accepted").length}
                        </p>
                    </div>
                </div>

                {/* Event information */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                Event request
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-slate-900">
                                Corporate Annual Meeting
                            </h2>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
                            3 Offers Received
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            December 15, 2026
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin size={16} />
                            Ahmedabad
                        </span>
                        <span className="flex items-center gap-2">
                            <Users size={16} />
                            250 Guests
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">
                        Organizer Offers
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {["All", "Pending", "Accepted", "Rejected"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${filter === item
                                        ? "bg-indigo-600 text-white"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quotation cards */}
                <div className="space-y-4">
                    {filteredQuotations.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                            <FileText className="mx-auto text-slate-300" size={36} />
                            <h3 className="mt-3 font-semibold text-slate-800">
                                No quotations found
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                There are no quotations in this category.
                            </p>
                        </div>
                    ) : (
                        filteredQuotations.map((quotation) => {
                            const isExpanded = expandedId === quotation.id;

                            return (
                                <div
                                    key={quotation.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <div className="p-5">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-bold text-slate-900">
                                                        {quotation.organizer}
                                                    </h3>
                                                    <StatusBadge status={quotation.status} />
                                                </div>

                                                <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                                                    <Star size={15} fill="currentColor" />
                                                    <span className="font-semibold">
                                                        {quotation.rating}
                                                    </span>
                                                    <span className="text-slate-400">
                                                        Organizer rating
                                                    </span>
                                                </div>

                                                <p className="mt-3 text-sm text-slate-500">
                                                    Submitted on {quotation.submitted}
                                                </p>
                                            </div>

                                            <div className="min-w-[140px]">
                                                <p className="text-xs text-slate-500">
                                                    Total quotation
                                                </p>
                                                <p className="mt-1 text-2xl font-bold text-indigo-700">
                                                    {formatPrice(quotation.total)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-xs text-slate-500">Event date</p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {quotation.eventDate}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Services</p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {quotation.services.length} Services
                                                </p>
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <p className="text-xs text-slate-500">Offer valid until</p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {quotation.validUntil}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setExpandedId(isExpanded ? null : quotation.id)
                                            }
                                            className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                        >
                                            {isExpanded ? "Hide details" : "View quotation details"}
                                            {isExpanded ? (
                                                <ChevronUp size={17} />
                                            ) : (
                                                <ChevronDown size={17} />
                                            )}
                                        </button>

                                        {isExpanded && (
                                            <div className="mt-4 rounded-xl border border-slate-200 p-4">
                                                <h4 className="font-semibold text-slate-900">
                                                    Service price breakdown
                                                </h4>

                                                <div className="mt-3 space-y-3">
                                                    {quotation.services.map((service, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between gap-3 text-sm"
                                                        >
                                                            <span className="text-slate-600">
                                                                {service.name}
                                                            </span>
                                                            <span className="font-medium text-slate-800">
                                                                {formatPrice(service.amount)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 flex justify-between border-t border-slate-200 pt-3">
                                                    <span className="font-bold text-slate-900">
                                                        Total amount
                                                    </span>
                                                    <span className="font-bold text-indigo-700">
                                                        {formatPrice(quotation.total)}
                                                    </span>
                                                </div>

                                                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                                                    <p className="text-xs font-semibold text-slate-500">
                                                        ORGANIZER NOTES
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-700">
                                                        {quotation.notes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {quotation.status === "Pending" && (
                                            <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                                                <button
                                                    onClick={() =>
                                                        updateStatus(quotation.id, "Accepted")
                                                    }
                                                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                                >
                                                    <CheckCircle2 size={17} />
                                                    Accept quotation
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(quotation.id, "Rejected")
                                                    }
                                                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                                >
                                                    <XCircle size={17} />
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {quotation.status !== "Pending" && (
                                            <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                                                You have {quotation.status.toLowerCase()} this quotation.
                                            </p>
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
