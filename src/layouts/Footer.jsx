
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">

        <div>
          <div className="mb-4 flex items-center gap-2 text-white">
            <CalendarDays className="text-blue-400" />
            <span className="text-xl font-bold">
              EventConnect
            </span>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-400">
            Discover professional event organizers and
            make every event memorable.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore Organizers</Link>
            <Link to="/register">Become an Organizer</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Contact
          </h3>

          <p className="text-sm text-gray-400">
            Have questions about EventConnect?
          </p>

          <p className="mt-3 text-sm text-blue-400">
            Contact our team
          </p>
        </div>

      </div>

      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} EventConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
