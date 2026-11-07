
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  CalendarDays,
} from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(
      `Registration form is working! Selected account: ${
        role === "client" ? "Client" : "Event Organizer"
      }. Backend registration will be added later.`
    );
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/60">

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join Tixly and make your events happen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Account Type */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              I want to join Tixly as
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`rounded-xl border p-4 text-center transition ${
                  role === "client"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                <CalendarDays className="mx-auto mb-2" size={25} />
                <span className="block text-sm font-semibold">Client</span>
                <span className="mt-1 block text-xs">
                  Plan an event
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("organizer")}
                className={`rounded-xl border p-4 text-center transition ${
                  role === "organizer"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                <Briefcase className="mx-auto mb-2" size={25} />
                <span className="block text-sm font-semibold">
                  Organizer
                </span>
                <span className="mt-1 block text-xs">
                  Manage events
                </span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
              <User size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
              <Mail size={18} className="text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
              <Lock size={18} className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-indigo-500">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          {/* Feedback Message */}
          {message && (
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
