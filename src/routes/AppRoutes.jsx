
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../features/home/pages/Home";
import ExploreOrganizers from "../features/organizers/pages/ExploreOrganizers";
import OrganizerDetails from "../features/organizers/pages/OrganizerDetails";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ClientDashboard from "../features/client/pages/ClientDashboard";
import OrganizerDashboard from "../features/organizer/pages/OrganizerDashboard";
import CreateEvent from "../features/client/pages/CreateEvent";
import OrganizerLeads from "../features/organizer/pages/OrganizerLeads";
import OrganizerQuotations from "../features/organizer/pages/OrganizerQuotations";
import ClientQuotations from "../features/client/pages/ClientQuotations";
import MyEvents from "../features/client/pages/MyEvents";
import OrganizerBookings from "../features/organizer/pages/OrganizerBookings";
import OrganizerMessages from "../features/organizer/pages/OrganizerMessages";
import ClientMessages from "../features/client/pages/ClientMessages";

const About = () => (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">About EventConnect</h1>
        <p className="mt-4 text-gray-500">
            Connecting clients with professional event organizers.
        </p>
    </div>
);

const NotFound = () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-3 text-gray-500">Page not found.</p>
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicLayout><Home /></PublicLayout>} path="/" />

            <Route
                path="/explore"
                element={<PublicLayout><ExploreOrganizers /></PublicLayout>}
            />

            <Route
                path="/organizers/:id"
                element={<PublicLayout><OrganizerDetails /></PublicLayout>}
            />

            <Route
                path="/about"
                element={<PublicLayout><About /></PublicLayout>}
            />

            <Route
                path="/login"
                element={<PublicLayout><Login /></PublicLayout>}
            />

            <Route
                path="/register"
                element={<PublicLayout><Register /></PublicLayout>}
            />

            <Route path="*" element={<NotFound />} />
            <Route
                path="/client/dashboard"
                element={<ClientDashboard />}
            />

            <Route
                path="/organizer/dashboard"
                element={<OrganizerDashboard />}
            />
            <Route
                path="/client/create-event"
                element={<CreateEvent />}
            />
            <Route
                path="/organizer/leads"
                element={<OrganizerLeads />}
            />
            <Route
                path="/organizer/quotations"
                element={<OrganizerQuotations />}
            />
            <Route
                path="/client/quotations"
                element={<ClientQuotations />}
            />
            <Route
                path="/client/events"
                element={<MyEvents />}
            />
            <Route
                path="/organizer/bookings"
                element={<OrganizerBookings />}
            />
            <Route
                path="/organizer/messages"
                element={<OrganizerMessages />}
            />
            <Route path="/client/messages"
                element={<ClientMessages />}
            />
        </Routes>

    );
};

export default AppRoutes;
