
import {
  BriefcaseBusiness,
  Laptop,
  Heart,
  GraduationCap,
  Music,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Corporate Events", icon: BriefcaseBusiness },
  { name: "Tech Conferences", icon: Laptop },
  { name: "Weddings", icon: Heart },
  { name: "College Festivals", icon: GraduationCap },
  { name: "Music & Entertainment", icon: Music },
  { name: "Product Launches", icon: Rocket },
];

const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10 text-center">
        <p className="font-semibold text-blue-600">
          EXPLORE CATEGORIES
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Events for Every Occasion
        </h2>

        <p className="mt-3 text-gray-500">
          Find the right professionals for your next event.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              to="/explore"
              key={category.name}
              className="group rounded-2xl border border-gray-200 p-6 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={26} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-800">
                {category.name}
              </h3>
            </Link>
          );
        })}

      </div>
    </section>
  );
};

export default Categories;
