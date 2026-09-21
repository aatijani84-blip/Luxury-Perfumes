import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { supabase } from "../supabase";

export function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();

setError("");
setLoading(true);

const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
});

if (error) {
    setError(error.message);
    setLoading(false);
    return;
}

setLoading(false);
navigate("/");
};

return (
<>
    <title>LOGIN</title>

    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-700">
        Login
        </h1>

        <p className="mb-6 text-center text-gray-500">
        Login to your Luxury Perfumes account
        </p>

        {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
        </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
        <div>
            <label
            htmlFor="email"
            className="mb-1 block font-semibold text-gray-700"
            >
            Email
            </label>

            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400"
            />
        </div>

        <div>
            <label
            htmlFor="password"
            className="mb-1 block font-semibold text-gray-700"
            >
            Password
            </label>

            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-amber-400"
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-600 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Logging in..." : "Login"}
        </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
        Don't have an account?{" "}
        <NavLink
            to="/signup"
            className="font-semibold text-amber-600 hover:underline"
        >
            Sign Up
        </NavLink>
        </p>
    </div>
    </div>
</>
);
}
