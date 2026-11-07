
import { Search, MapPin, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (eventType) params.set("type", eventType);
    if (location) params.set("location", location);

    navigate(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-35">
        <img
          src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1800"
          alt="Professional event celebration"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">

        <div className="max-w-3xl">

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <CalendarDays size={16} />
            Your event, perfectly organized
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight text-white md:text-6xl">
            Find the Perfect
            <span className="block text-blue-400">
              Event Organizer
            </span>
            for Every Occasion.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
            Connect with professional event organizers,
            compare quotations, and bring your dream event
            to life.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-10 grid gap-3 rounded-2xl bg-white p-3 shadow-2xl md:grid-cols-[1fr_1fr_auto]"
          >
            <div className="flex items-center gap-3 px-3">
              <Search className="shrink-0 text-blue-600" />

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-gray-700 outline-none"
              >
                <option value="">Select Event Type</option>
                <option value="Corporate">Corporate Event</option>
                <option value="Technology">Technology Conference</option>
                <option value="Wedding">Wedding</option>
                <option value="College">College Festival</option>
                <option value="Product Launch">Product Launch</option>
              </select>
            </div>

            <div className="flex items-center gap-3 border-gray-200 px-3 md:border-l">
              <MapPin className="shrink-0 text-blue-600" />

              <input
                type="text"
                placeholder="Enter city or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-3 text-sm text-gray-700 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-300">
            <span>✓ Verified organizers</span>
            <span>✓ Compare quotations</span>
            <span>✓ Easy booking</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
