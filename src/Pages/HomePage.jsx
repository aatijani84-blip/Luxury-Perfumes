import { NavLink, useNavigate } from "react-router";
import { Description } from "../Home-Component/Description";
import { Footer } from "../Home-Component/footer";
import { ImageSlider } from "../Home-Component/ImageSlider";
import { useEffect, useState } from "react";
import { supabase } from "../Auth/supabase";

export function HomePage() {
const navigate = useNavigate();

const [username, setUsername] = useState("");
const [loadingUser, setLoadingUser] = useState(true);

useEffect(() => {
const getUser = async () => {
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    setUsername("");
    setLoadingUser(false);
    return;
    }

    const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

    if (error) {
    console.error("Error fetching profile:", error);
    setUsername("");
    setLoadingUser(false);
    return;
    }

    setUsername(data.username);
    setLoadingUser(false);
};

getUser();
}, []);

const handleLogout = async () => {
const { error } = await supabase.auth.signOut();

if (error) {
    console.error("Logout error:", error);
    return;
}

setUsername("");
navigate("/");
};

useEffect(() => {
const testConnection = async () => {
    const { data, error } = await supabase.from("perfumes").select("*");

    console.log("Data:", data);
    console.log("Error:", error);
};

testConnection();
}, []);

return (
<>
    <title>HOME</title>

    <div className="scroll-smooth sticky top-0 z-30 shadow-2xl bg-transparent backdrop-blur-sm backdrop-filter border-b-2 border-amber-400">
    <h1 className="bg-gray-600 sm:text-4xl md:text-6xl lg:text-9xl text-center py-1 drop-shadow-2xl">
        LUXURY PERFUMES
    </h1>

    <p className="text-center py-2">Your Smell Our Priority</p>
    </div>

    <div className="xl:flex md:flex-col gap-4 py-4 xl:flex-row md:justify-between md:flex xl:items-center md:items-center sm:flex-col sm:items-center sm:justify-center w-full">
    <div className="sm:inline-block xl:flex-row md:items-center sm:items-center">
        <NavLink
        to="/"
        className="text-2xl font-bold text-gray-400 hover:text-gray-600"
        >
        LUXURY PERFUME
        </NavLink>
    </div>

    <div className="md:inline-block xl:flex-row md:items-center sm:items-center">
        <input
        type="text"
        className="border-2 border-amber-400 rounded-l-lg px-3 py-2 xl:w-2xl md:w-1/3"
        placeholder="Search perfumes..."
        />

        <button className="bg-gray-400 text-white rounded-r-lg px-4 py-2 cursor-pointer hover:bg-gray-600">
        Search
        </button>
    </div>

    <nav className="flex gap-4 justify-between md:justify-end items-center">
        <NavLink
        to="/about"
        className={({ isActive }) =>
            isActive
            ? "text-red-400 cursor-pointer font-bold px-3 py-2"
            : "hover:text-gray-600 cursor-pointer px-3 py-2 hover:underline text-gray-400 transition-colors duration-200"
        }
        >
        ABOUT
        </NavLink>

        {!loadingUser && !username && (
        <>
            <NavLink
            to="/login"
            className={({ isActive }) =>
                isActive
                ? "text-red-400 cursor-pointer font-bold px-3 py-2"
                : "hover:text-gray-600 cursor-pointer px-3 py-2 hover:underline text-gray-400 transition-colors duration-200"
            }
            >
            Login
            </NavLink>

            <NavLink
            to="/signUp"
            className={({ isActive }) =>
                isActive
                ? "text-red-400 cursor-pointer font-bold px-3 py-2"
                : "hover:text-gray-600 cursor-pointer hover:underline px-3 py-2 text-gray-400 transition-colors duration-200"
            }
            >
            Sign Up
            </NavLink>
        </>
        )}

        {!loadingUser && username && (
        <>
            <span className="px-3 py-2 font-bold text-gray-600">
            {username}
            </span>

            <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer px-3 py-2 text-gray-400 transition-colors duration-200 hover:text-gray-600 hover:underline"
            >
            Logout
            </button>
        </>
        )}

        <NavLink
        to="/order"
        className={({ isActive }) =>
            isActive
            ? "text-red-400 cursor-pointer font-bold px-3 py-2"
            : "hover:text-gray-600 cursor-pointer px-3 py-2 hover:underline text-gray-400 transition-colors duration-200"
        }
        >
        ORDER
        </NavLink>

        <NavLink
        to="/cart"
        className={({ isActive }) =>
            isActive
            ? "text-red-400 cursor-pointer font-bold px-3 py-2"
            : "hover:text-gray-600 relative cursor-pointer px-3 py-2 text-gray-400 transition-colors duration-200"
        }
        >
        <div className="relative inline-block">
            <img
            src="/Cart.jpg"
            alt="Cart"
            className="relative inline-block h-10 w-10 bg-gray-100"
            />

            <div className="absolute top-5 -right-2 bg-gray-400 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs lg:5/10 lg:left-6">
            0
            </div>
        </div>
        </NavLink>
    </nav>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[500px_minmax(0,1fr)] gap-1 border-b-2 border-amber-400">
    <div className="flex items-center justify-center">
        <Description />
    </div>

    <div className="overflow-hidden rounded-lg shadow-2xl">
        <ImageSlider />
    </div>
    </div>

    <div>
    <Footer />
    </div>
</>
);
}
