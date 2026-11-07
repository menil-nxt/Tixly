
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { organizers } from "../../../data/mockOrganizers";
import OrganizerCard from "../../../components/cards/OrganizerCard";

const FeaturedOrganizers = () => {
  return (
    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-blue-600">
              TOP PROFESSIONALS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Featured Organizers
            </h2>

            <p className="mt-3 text-gray-500">
              Discover professionals who can bring your event to life.
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-2 font-semibold text-blue-600"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {organizers.map((organizer) => (
            <OrganizerCard
              key={organizer.id}
              organizer={organizer}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedOrganizers;
