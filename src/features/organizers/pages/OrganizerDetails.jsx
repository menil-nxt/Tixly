
import { useParams, Link } from "react-router-dom";
import { organizers } from "../../../data/mockOrganizers";
import { MapPin, Star, ArrowLeft } from "lucide-react";

const OrganizerDetails = () => {
    const { id } = useParams();

    const organizer = organizers.find(
        (item) => item.id === id
    );

    if (!organizer) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold">Organizer not found</h1>
                <Link to="/explore" className="mt-4 inline-block text-blue-600">
                    Back to Explore
                </Link>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-5xl px-6 py-16">

            <Link to="/explore" className="flex items-center gap-2 text-blue-600">
                <ArrowLeft size={18} />
                Back to organizers
            </Link>

            <img
                src={organizer.image}
                alt={organizer.name}
                className="mt-8 h-80 w-full rounded-2xl object-cover"
            />

            <h1 className="mt-8 text-3xl font-bold">
                {organizer.name}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-gray-500">
                <MapPin size={18} />
                {organizer.location}
            </p>

            <p className="mt-3 flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={18} />
                {organizer.rating} ({organizer.reviews} reviews)
            </p>

            <p className="mt-6 leading-7 text-gray-600">
                {organizer.description}
            </p>

            <p className="mt-5 text-xl font-bold">
                Starting from ₹{organizer.startingPrice.toLocaleString("en-IN")}
            </p>

            <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">
                Request a Quotation
            </button>

        </section>
    );
};

export default OrganizerDetails;
