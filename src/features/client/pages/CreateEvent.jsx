
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Users,
    IndianRupee,
    FileText,
    CheckCircle,
} from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const navItems = [
    { label: "Overview", path: "/client/dashboard", icon: CalendarDays },
    { label: "Create Event", path: "/client/create-event", icon: FileText },
    { label: "My Events", path: "/client/events", icon: CalendarDays },
    { label: "Quotations", path: "/client/quotations", icon: FileText },
];

function CreateEvent() {
    const [formData, setFormData] = useState({
        eventName: "",
        eventType: "",
        eventDate: "",
        location: "",
        guestCount: "",
        budget: "",
        description: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSuccess(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend demonstration only.
        // We will save this request to MongoDB later.
        console.log("Event request:", formData);
        setSuccess(true);
    };

    return (
        <DashboardLayout
            title="Create Event Request"
            role="Client"
            navItems={navItems}
        >
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/client/dashboard"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                >
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </Link>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Tell us about your event
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Share your requirements so event organizers can prepare suitable
                        quotations for you.
                    </p>
                </div>

                {success && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                        <CheckCircle className="mt-0.5 shrink-0" size={20} />
                        <div>
                            <p className="font-semibold">Event request submitted successfully!</p>
                            <p className="mt-1 text-sm">
                                This is a frontend demonstration. Your request has not yet been
                                saved or sent to organizers.
                            </p>
                        </div>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
                >
                    {/* Event Information */}
                    <section>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Event Information</h3>
                                <p className="text-xs text-slate-500">
                                    Basic details about your event
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Event Name *
                                </label>
                                <input
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    placeholder="e.g. Annual College Function"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Event Type *
                                </label>
                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Select event type</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Birthday">Birthday Party</option>
                                    <option value="Corporate">Corporate Event</option>
                                    <option value="College">College Event</option>
                                    <option value="Concert">Concert / Music Event</option>
                                    <option value="Product Launch">Product Launch</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Date and Location */}
                    <section>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                <CalendarDays size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Date & Location</h3>
                                <p className="text-xs text-slate-500">
                                    When and where will the event happen?
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Event Date *
                                </label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    min={new Date().toLocaleDateString("en-CA")}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Event Location *
                                </label>
                                <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
                                    <MapPin size={18} className="shrink-0 text-slate-400" />
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City or venue"
                                        required
                                        className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Guest and Budget */}
                    <section>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Guests & Budget</h3>
                                <p className="text-xs text-slate-500">
                                    Help organizers understand the event scale
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Expected Guests *
                                </label>
                                <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
                                    <Users size={18} className="text-slate-400" />
                                    <input
                                        type="number"
                                        name="guestCount"
                                        value={formData.guestCount}
                                        onChange={handleChange}
                                        placeholder="e.g. 200"
                                        min="1"
                                        required
                                        className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Estimated Budget (INR) *
                                </label>
                                <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
                                    <IndianRupee size={18} className="text-slate-400" />
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="e.g. 50000"
                                        min="1"
                                        required
                                        className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Description */}
                    <section>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Describe Your Requirements *
                        </label>
                        <p className="mb-3 text-xs text-slate-500">
                            Mention decoration, catering, photography, sound, lighting, or
                            anything else you need.
                        </p>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your event and the services you are looking for..."
                            rows={5}
                            required
                            className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                        />
                    </section>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Submit Event Request
                    </button>

                    <p className="text-center text-xs text-slate-400">
                        You can compare organizer quotations after this feature is connected
                        to the backend.
                    </p>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default CreateEvent;
