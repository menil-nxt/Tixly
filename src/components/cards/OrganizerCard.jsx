
import { MapPin, Star, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrganizerCard = ({ organizer }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-52 overflow-hidden">
        <img
          src={organizer.image}
          alt={organizer.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {organizer.verified && (
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
            <BadgeCheck size={14} />
            Verified
          </span>
        )}
      </div>

      <div className="p-5">

        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-gray-900">
            {organizer.name}
          </h3>

          <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
            {organizer.rating}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={15} />
          {organizer.location}
        </p>

        <p className="mt-3 text-sm text-gray-500">
          {organizer.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

          <div>
            <p className="text-xs text-gray-500">
              Starting from
            </p>

            <p className="font-bold text-gray-900">
              ₹{organizer.startingPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <Link
            to={`/organizers/${organizer.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View Profile
            <ArrowUpRight size={16} />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
