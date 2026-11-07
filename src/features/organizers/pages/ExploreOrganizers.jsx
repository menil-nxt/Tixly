
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { organizers } from "../../../data/mockOrganizers";
import OrganizerCard from "../../../components/cards/OrganizerCard";

const ExploreOrganizers = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const initialLocation = searchParams.get("location") || "";
  const initialType = searchParams.get("type") || "";

  const [location, setLocation] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState(initialType);

  const filteredOrganizers = useMemo(() => {
    return organizers.filter((organizer) => {
      const matchesSearch =
        organizer.name.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        organizer.location.toLowerCase().includes(location.toLowerCase());

      const matchesCategory =
        category === "All" ||
        organizer.category.toLowerCase().includes(category.toLowerCase());

      const matchesType =
        !selectedType ||
        organizer.category.toLowerCase().includes(selectedType.toLowerCase());

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesType
      );
    });
  }, [search, location, category, selectedType]);

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-16">

      <div>
        <p className="font-semibold text-blue-600">
          DISCOVER PROFESSIONALS
        </p>

        <h1 className="mt-3 text-4xl font-bold text-gray-900">
          Explore Event Organizers
        </h1>

        <p className="mt-3 text-gray-500">
          Find the right team to make your event unforgettable.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
          <Search className="text-blue-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organizer..."
            className="w-full outline-none"
          />
        </div>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Filter by location..."
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Corporate">Corporate Events</option>
          <option value="Technology">Technology</option>
          <option value="Wedding">Wedding</option>
        </select>

      </div>

      <div className="mt-10 mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Available Organizers
        </h2>

        <span className="text-sm text-gray-500">
          {filteredOrganizers.length} results
        </span>
      </div>

      {filteredOrganizers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrganizers.map((organizer) => (
            <OrganizerCard
              key={organizer.id}
              organizer={organizer}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 py-16 text-center">
          <p className="font-semibold text-gray-700">
            No organizers found.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try changing your search filters.
          </p>
        </div>
      )}

    </section>
  );
};

export default ExploreOrganizers;
