
import { useState } from "react";
import {
    CalendarDays,
    Users,
    FileText,
    Plus,
    IndianRupee,
    Send,
    Trash2,
    CheckCircle,
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
        id: "lead-1",
        name: "Corporate Annual Meeting",
        client: "Rahul Shah",
        budget: 80000,
    },
    {
        id: "lead-2",
        name: "Wedding Celebration",
        client: "Priya Patel",
        budget: 150000,
    },
    {
        id: "lead-3",
        name: "College Fest",
        client: "Amit Joshi",
        budget: 50000,
    },
    {
        id: "lead-4",
        name: "Birthday Celebration",
        client: "Neha Desai",
        budget: 30000,
    },
];

function OrganizerQuotations() {
    const [selectedLead, setSelectedLead] = useState("");
    const [price, setPrice] = useState("");
    const [validity, setValidity] = useState("7");
    const [notes, setNotes] = useState("");
    const [terms, setTerms] = useState(
        "50% advance payment is required to confirm the booking."
    );
    const [services, setServices] = useState([
        { id: 1, name: "Event Decoration", amount: "" },
        { id: 2, name: "Sound & Lighting", amount: "" },
    ]);
    const [quotations, setQuotations] = useState([]);
    const [message, setMessage] = useState("");

    const selectedLeadData = sampleLeads.find(
        (lead) => lead.id === selectedLead
    );

    const updateService = (id, field, value) => {
        setServices((previous) =>
            previous.map((service) =>
                service.id === id ? { ...service, [field]: value } : service
            )
        );
    };

    const addService = () => {
        setServices((previous) => [
            ...previous,
            { id: Date.now(), name: "", amount: "" },
        ]);
    };

    const removeService = (id) => {
        setServices((previous) =>
            previous.filter((service) => service.id !== id)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (!selectedLeadData) {
            setMessage("Please select an event request.");
            return;
        }

        if (Number(price) <= 0) {
            setMessage("Please enter a valid quotation amount.");
            return;
        }

        if (services.length === 0 || services.some(
            (service) => !service.name.trim() || Number(service.amount) <= 0
        )) {
            setMessage("Please complete every service name and amount.");
            return;
        }

        const newQuotation = {
            id: Date.now(),
            event: selectedLeadData.name,
            client: selectedLeadData.client,
            price: Number(price),
            validity,
            notes,
            terms,
            services: services.map((service) => ({ ...service })),
            status: "Draft submitted",
        };

        setQuotations((previous) => [newQuotation, ...previous]);

        setSelectedLead("");
        setPrice("");
        setValidity("7");
        setNotes("");
        setTerms("50% advance payment is required to confirm the booking.");
        setServices([
            { id: Date.now() + 1, name: "Event Decoration", amount: "" },
        ]);

        setMessage("Quotation created successfully in this demo!");
    };

    return (
        <DashboardLayout
            title="Quotation Management"
            role="Organizer"
            navItems={navItems}
        >
            <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">
                    Create Quotations
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Prepare professional quotations for client event requests.
                </p>
            </div>

            {message && (
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
                    <CheckCircle size={19} className="shrink-0" />
                    {message}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
            >
                {/* Select Lead */}
                <section>
                    <h3 className="mb-4 font-bold text-slate-900">
                        1. Select Client Event
                    </h3>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Event Request *
                    </label>

                    <select
                        value={selectedLead}
                        onChange={(e) => setSelectedLead(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose an event request</option>
                        {sampleLeads.map((lead) => (
                            <option key={lead.id} value={lead.id}>
                                {lead.name} — {lead.client}
                            </option>
                        ))}
                    </select>

                    {selectedLeadData && (
                        <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm">
                            <p className="font-semibold text-slate-800">
                                {selectedLeadData.name}
                            </p>
                            <p className="mt-1 text-slate-500">
                                Client: {selectedLeadData.client}
                            </p>
                            <p className="mt-1 text-slate-500">
                                Client's estimated budget: ₹
                                {selectedLeadData.budget.toLocaleString("en-IN")}
                            </p>
                        </div>
                    )}
                </section>

                <div className="border-t border-slate-100" />

                {/* Services */}
                <section>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="font-bold text-slate-900">
                                2. Services & Pricing
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Add the services included in your quotation.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addService}
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
                        >
                            <Plus size={16} /> Add Service
                        </button>
                    </div>

                    <div className="space-y-3">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[1fr_180px_auto] sm:items-center"
                            >
                                <input
                                    type="text"
                                    placeholder={`Service ${index + 1} name`}
                                    value={service.name}
                                    onChange={(e) =>
                                        updateService(service.id, "name", e.target.value)
                                    }
                                    required
                                    className="min-w-0 rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                                />

                                <div className="flex items-center rounded-lg border border-slate-200 px-3">
                                    <IndianRupee size={16} className="text-slate-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Amount"
                                        value={service.amount}
                                        onChange={(e) =>
                                            updateService(service.id, "amount", e.target.value)
                                        }
                                        required
                                        className="w-full min-w-0 px-2 py-3 text-sm outline-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeService(service.id)}
                                    disabled={services.length === 1}
                                    className="flex items-center justify-center rounded-lg p-3 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Remove service"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="border-t border-slate-100" />

                {/* Total Price */}
                <section>
                    <h3 className="mb-4 font-bold text-slate-900">
                        3. Quotation Details
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Total Quotation Amount (INR) *
                            </label>
                            <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
                                <IndianRupee size={18} className="text-slate-400" />
                                <input
                                    type="number"
                                    min="1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 65000"
                                    required
                                    className="w-full px-3 py-3 text-sm outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Quotation Validity *
                            </label>
                            <select
                                value={validity}
                                onChange={(e) => setValidity(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            >
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="15">15 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Additional Notes
                        </label>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any extra information for the client..."
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Terms & Conditions
                        </label>
                        <textarea
                            rows={3}
                            value={terms}
                            onChange={(e) => setTerms(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
                >
                    <Send size={18} />
                    Create Quotation
                </button>

                <p className="text-center text-xs text-slate-400">
                    This demo creates a local quotation preview. It does not send it to a
                    client or save it permanently.
                </p>
            </form>

            {/* Created Quotations */}
            <section className="mt-8">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Recently Created Quotations
                </h3>

                {quotations.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                        <FileText className="mx-auto mb-3 text-slate-400" size={30} />
                        <p className="font-semibold text-slate-700">
                            No quotations created yet
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Your created quotations will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {quotations.map((quotation) => (
                            <div
                                key={quotation.id}
                                className="rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            {quotation.event}
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Client: {quotation.client}
                                        </p>
                                        <p className="mt-2 text-xs text-emerald-700">
                                            {quotation.status} · Valid for {quotation.validity} days
                                        </p>
                                    </div>
                                    <p className="text-lg font-bold text-slate-900">
                                        ₹{quotation.price.toLocaleString("en-IN")}
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-slate-100 pt-3">
                                    <p className="text-xs font-semibold text-slate-600">
                                        Included services
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {quotation.services.map((service, index) => (
                                            <li
                                                key={`${quotation.id}-${index}`}
                                                className="flex justify-between gap-3 text-sm text-slate-500"
                                            >
                                                <span>{service.name}</span>
                                                <span>
                                                    ₹{Number(service.amount).toLocaleString("en-IN")}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </DashboardLayout>
    );
}

export default OrganizerQuotations;
