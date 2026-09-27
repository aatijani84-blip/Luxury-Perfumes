import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Description } from "../Home-Component/Description";
import { Footer } from "../Home-Component/footer";
import { ImageSlider } from "../Home-Component/ImageSlider";
import { Modal } from "../Home-Component/Modal";
import { supabase } from "../../Auth/supabase";
import {
FiShoppingCart,
FiSearch,
FiHeart,
FiTruck,
FiShield,
FiStar,
FiMenu,
FiX,
} from "react-icons/fi";

export function HomePage() {
const navigate = useNavigate();

const [username, setUsername] = useState("");
const [loadingUser, setLoadingUser] = useState(true);
const [cartCount, setCartCount] = useState(0);
const [search, setSearch] = useState("");
const [menuOpen, setMenuOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);

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

    setUsername(data.username || "");
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
let channel;

const setupCart = async () => {
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    setCartCount(0);
    return;
    }

    const fetchCartCount = async () => {
    const { data, error } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);

    if (error) {
        console.error("Error fetching cart count:", error);
        return;
    }

    const totalQuantity = data.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    setCartCount(totalQuantity);
    };

    await fetchCartCount();

    channel = supabase
    .channel(`cart-count-${user.id}`)
    .on(
        "postgres_changes",
        {
        event: "*",
        schema: "public",
        table: "cart_items",
        filter: `user_id=eq.${user.id}`,
        },
        () => {
        fetchCartCount();
        },
    )
    .subscribe();
};

setupCart();

return () => {
    if (channel) {
    supabase.removeChannel(channel);
    }
};
}, []);

const handleSearch = (event) => {
event.preventDefault();

if (!search.trim()) {
    return;
}

navigate(`/male-perfume?search=${encodeURIComponent(search.trim())}`);
setSearch("");
setMenuOpen(false);
};

return (
<>
    <title>Luxury Perfumes</title>

    <div className="min-h-screen bg-gray-50 text-gray-800">
    {/* Top announcement */}
    <div className="bg-gray-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        FREE SHIPPING ON SELECTED ORDERS
    </div>

    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <NavLink to="/" className="shrink-0">
            <p className="text-lg font-bold tracking-[0.2em] text-gray-900 sm:text-xl">
                LUXURY
            </p>

            <p className="text-xs font-medium tracking-[0.35em] text-amber-600">
                PERFUMES
            </p>
            </NavLink>

            {/* Desktop Search */}
            <form
            onSubmit={handleSearch}
            className="hidden max-w-xl flex-1 md:flex"
            >
            <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search perfumes, brands..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-24 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
                />

                <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                Search
                </button>
            </div>
            </form>

            {/* Desktop actions */}
            <div className="hidden items-center gap-1 md:flex">
            <NavLink
                to="/about"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
                About
            </NavLink>

            {!loadingUser && !username && (
                <>
                <NavLink
                    to="/login"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                    Login
                </NavLink>

                <NavLink
                    to="/signUp"
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                    Sign Up
                </NavLink>
                </>
            )}

            {!loadingUser && username && (
                <>
                <span className="max-w-28 truncate px-3 py-2 text-sm font-semibold text-gray-700">
                    {username}
                </span>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                >
                    Logout
                </button>
                </>
            )}

            <NavLink
                to="/order"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
                Orders
            </NavLink>

            <NavLink
                to="/cart"
                className="relative ml-1 rounded-full p-2.5 text-gray-700 transition hover:bg-gray-100"
            >
                <FiShoppingCart className="text-xl" />

                {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                </span>
                )}
            </NavLink>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
            <NavLink
                to="/cart"
                className="relative rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
            >
                <FiShoppingCart className="text-xl" />

                {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                </span>
                )}
            </NavLink>

            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100"
            >
                {menuOpen ? (
                <FiX className="text-2xl" />
                ) : (
                <FiMenu className="text-2xl" />
                )}
            </button>
            </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="pb-4 md:hidden">
            <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search perfumes..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-20 text-sm outline-none focus:border-amber-500"
            />

            <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
            >
                Search
            </button>
            </div>
        </form>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                About
            </NavLink>

            <NavLink
                to="/order"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                Orders
            </NavLink>

            {!loadingUser && !username && (
                <>
                <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    Login
                </NavLink>

                <NavLink
                    to="/signUp"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                    Sign Up
                </NavLink>
                </>
            )}

            {!loadingUser && username && (
                <>
                <div className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Welcome, {username}
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                    Logout
                </button>
                </>
            )}
            </nav>
        </div>
        )}
    </header>

    {/* Hero section */}
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
        <div className="mb-5 text-center sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 sm:text-sm">
            Discover Your Signature Scent
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            LUXURY PERFUMES
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Discover carefully selected fragrances made to express your
            personality, style, and presence.
        </p>
        </div>

        {/* Existing components - untouched */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[400px_minmax(0,1fr)] xl:grid-cols-[450px_minmax(0,1fr)] lg:items-stretch">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <Description />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <ImageSlider />
        </div>
        </div>
    </section>

    {/* Feature section */}
    <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 px-2 py-6 sm:px-6">
            <div className="rounded-full bg-amber-50 p-3 text-amber-600">
            <FiTruck className="text-xl" />
            </div>

            <div>
            <h3 className="font-semibold text-gray-900">Fast Delivery</h3>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Get your fragrance delivered safely.
            </p>
            </div>
        </div>

        <div className="flex items-center gap-4 px-2 py-6 sm:px-6">
            <div className="rounded-full bg-amber-50 p-3 text-amber-600">
            <FiShield className="text-xl" />
            </div>

            <div>
            <h3 className="font-semibold text-gray-900">Secure Shopping</h3>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Your account and orders stay protected.
            </p>
            </div>
        </div>

        <div className="flex items-center gap-4 px-2 py-6 sm:px-6">
            <div className="rounded-full bg-amber-50 p-3 text-amber-600">
            <FiStar className="text-xl" />
            </div>

            <div>
            <h3 className="font-semibold text-gray-900">
                Premium Selection
            </h3>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Explore fragrances from popular brands.
            </p>
            </div>
        </div>
        </div>
    </section>

    {/* Shopping categories */}
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
            Shop by collection
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Find Your Fragrance
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
            Explore our fragrance collections and discover a scent that fits
            your style.
        </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NavLink
            to="/Male-perfume"
            className="group relative overflow-hidden rounded-2xl bg-gray-900 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
        >
            <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Collection
            </p>

            <h3 className="mt-2 text-2xl font-bold">Men's Fragrances</h3>

            <p className="mt-2 max-w-sm text-sm text-gray-300">
                Discover bold, fresh, woody, and sophisticated fragrances.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Shop Collection{" "}
                <span className="transition group-hover:translate-x-1">
                →
                </span>
            </span>
            </div>

            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl" />
        </NavLink>

        <div className="group relative overflow-hidden rounded-2xl bg-gray-100 p-6 shadow-sm sm:p-8">
            <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                Coming Soon
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900">
                Women's Fragrances
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
                A beautiful collection of elegant and captivating fragrances
                is coming soon.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                Stay Tuned
                <FiHeart className="text-amber-600" />
            </span>
            </div>
        </div>
        </div>
    </section>

    {/* Call to action */}
    <section className="bg-gray-900 px-4 py-12 text-center text-white sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
        Your Smell, Our Priority
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold sm:text-3xl lg:text-4xl">
        Find a fragrance that becomes part of your identity.
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
        Browse our collection and discover your next signature scent.
        </p>

        <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mt-6 inline-flex items-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
        >
        Explore Perfumes
        </button>
    </section>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    <Footer />
    </div>
</>
);
}
