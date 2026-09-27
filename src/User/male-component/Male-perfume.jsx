import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import {
FiArrowLeft,
FiChevronDown,
FiHeart,
FiSearch,
FiShield,
FiShoppingBag,
FiTruck,
} from "react-icons/fi";
import { supabase } from "../../Auth/supabase";
import { Footer } from "../Home-Component/footer";

export function MalePerfume() {
const [malePerfumes, setMalePerfumes] = useState([]);
const [search, setSearch] = useState("");
const [clickedPerfume, setClickedPerfume] = useState(null);
const [addingToCart, setAddingToCart] = useState(null);
const [selectedBrand, setSelectedBrand] = useState("All");
const [sortBy, setSortBy] = useState("featured");
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabase
    .from("perfumes")
    .select("*")
    .eq("gender", "male");

    if (error) {
    console.error("Error fetching male perfume data:", error);
    setLoading(false);
    return;
    }

    setMalePerfumes(data || []);
    setLoading(false);
};

fetchData();
}, []);

const handleAddToCart = async (perfume) => {
setAddingToCart(perfume.id);

const {
    data: { user },
} = await supabase.auth.getUser();

if (!user) {
    setAddingToCart(null);
    alert("Please login to add items to your cart.");
    return;
}

const { data: existingItem, error: fetchError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("perfume_id", perfume.id)
    .maybeSingle();

if (fetchError) {
    console.error("Error checking cart:", fetchError);
    setAddingToCart(null);
    return;
}

if (existingItem) {
    const { error } = await supabase
    .from("cart_items")
    .update({
        quantity: existingItem.quantity + 1,
    })
    .eq("id", existingItem.id);

    if (error) {
    console.error("Error updating cart:", error);
    setAddingToCart(null);
    return;
    }
} else {
    const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    perfume_id: perfume.id,
    quantity: 1,
    });

    if (error) {
    console.error("Error adding to cart:", error);
    setAddingToCart(null);
    return;
    }
}

setAddingToCart(null);
setClickedPerfume(perfume.id);
alert(`${perfume.name} added to cart!`);
};

const brands = useMemo(() => {
return [
    "All",
    ...new Set(malePerfumes.map((perfume) => perfume.brand).filter(Boolean)),
];
}, [malePerfumes]);

const filteredPerfumes = useMemo(() => {
const filtered = malePerfumes.filter((perfume) => {
    const matchesSearch = `${perfume.name} ${perfume.brand}`
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesBrand =
    selectedBrand === "All" || perfume.brand === selectedBrand;

    return matchesSearch && matchesBrand;
});

return [...filtered].sort((a, b) => {
    if (sortBy === "price-low") {
    return Number(a.price) - Number(b.price);
    }

    if (sortBy === "price-high") {
    return Number(b.price) - Number(a.price);
    }

    if (sortBy === "name") {
    return a.name.localeCompare(b.name);
    }

    if (sortBy === "newest") {
    return Number(b.release_year || 0) - Number(a.release_year || 0);
    }

    return 0;
});
}, [malePerfumes, search, selectedBrand, sortBy]);

return (
<div className="min-h-screen bg-gray-50 text-gray-800">
    <title>Men's Perfumes | Luxury Perfumes</title>

    {/* Announcement */}
    <div className="bg-gray-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
    FREE SHIPPING ON SELECTED ORDERS
    </div>

    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
        <NavLink to="/" className="shrink-0 text-center">
            <span className="block text-sm font-bold tracking-[0.2em] text-gray-900 sm:text-base">
            LUXURY
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-amber-600 sm:text-xs">
            PERFUMES
            </span>
        </NavLink>

        <div className="hidden flex-1 justify-center md:flex">
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 lg:gap-8">
            <NavLink to="/" className="transition hover:text-amber-600">
                Home
            </NavLink>

            <a href="#collection" className="text-amber-600">
                Men's Collection
            </a>

            <a href="#why-us" className="transition hover:text-amber-600">
                Why Us
            </a>
            </nav>
        </div>

        <NavLink
            to="/"
            className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-amber-400 hover:text-amber-600"
        >
            <FiArrowLeft />
            <span className="hidden sm:inline">Back to Store</span>
        </NavLink>
        </div>
    </div>
    </header>

    {/* Hero */}
    <section className="border-b border-gray-200 bg-linear-to-br from-gray-950 via-gray-900 to-gray-800">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Men's Collection
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your{" "}
            <span className="block text-amber-400"> Signature Scent </span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore our collection of men's fragrances, carefully selected for
            confidence, elegance and everyday style.
        </p>
        </div>
    </div>
    </section>

    {/* Collection */}
    <main
    id="collection"
    className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
    {/* Breadcrumb */}
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <NavLink to="/" className="transition hover:text-amber-600">
        Home
        </NavLink>

        <span>/</span>

        <span className="font-medium text-gray-800">Men's Perfumes</span>
    </div>

    {/* Search + Filters */}
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by perfume or brand..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
        </div>

        {/* Sort */}
        <div className="relative w-full lg:w-56">
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
            >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
            </select>
        </div>
        </div>

        {/* Brand filters */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {brands.map((brand) => (
            <button
            key={brand}
            type="button"
            onClick={() => setSelectedBrand(brand)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedBrand === brand
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            >
            {brand}
            </button>
        ))}
        </div>
    </section>

    {/* Results Header */}
    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
        <p className="text-sm font-medium text-amber-600">
            Men's Fragrances
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Discover Your Scent
        </h2>
        </div>

        <p className="text-sm text-gray-500">
        {filteredPerfumes.length} perfume
        {filteredPerfumes.length !== 1 ? "s" : ""} found
        </p>
    </div>

    {/* Loading */}
    {loading && (
        <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
            <div
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
            <div className="h-72 animate-pulse bg-gray-200" />

            <div className="space-y-3 p-5">
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-8 animate-pulse rounded bg-gray-200" />
            </div>
            </div>
        ))}
        </div>
    )}

    {/* Product Grid */}
    {!loading && filteredPerfumes.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPerfumes.map((perfume) => (
            <article
            key={perfume.id}
            className="group flex min-h-125 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-gray-100 sm:h-80">
                <img
                src={perfume.image}
                alt={perfume.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
                Premium
                </div>

                {/* Wishlist UI */}
                <button
                type="button"
                aria-label={`Add ${perfume.name} to wishlist`}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
                >
                <FiHeart className="text-lg" />
                </button>
            </div>

            {/* Product Information */}
            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                {perfume.brand}
                </p>

                <h3 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                {perfume.name}
                </h3>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>Release {perfume.release_year}</span>

                <span className="flex items-center gap-1">
                    <span className="text-amber-500">★</span> Premium
                </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-2xl font-bold text-gray-900">
                    GH₵
                    {Number(perfume.price || 0).toFixed(2)}
                </p>
                </div>

                <div className="mt-auto pt-5">
                <button
                    type="button"
                    onClick={() => handleAddToCart(perfume)}
                    disabled={addingToCart === perfume.id}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition ${
                    clickedPerfume === perfume.id
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-900 hover:bg-amber-600"
                    } ${
                    addingToCart === perfume.id
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                >
                    <FiShoppingBag />

                    {addingToCart === perfume.id
                    ? "Adding..."
                    : clickedPerfume === perfume.id
                        ? "Added to Cart"
                        : "Add to Cart"}
                </button>
                </div>
            </div>
            </article>
        ))}
        </div>
    )}

    {/* Empty State */}
    {!loading && filteredPerfumes.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <FiSearch className="mx-auto text-4xl text-gray-300" />

        <h3 className="mt-4 text-xl font-bold text-gray-800">
            No perfumes found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Try a different perfume name, brand, or clear your current filter.
        </p>

        <button
            type="button"
            onClick={() => {
            setSearch("");
            setSelectedBrand("All");
            }}
            className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
            Clear Filters
        </button>
        </div>
    )}
    </main>

    {/* Benefits */}
    <section id="why-us" className="border-y border-gray-200 bg-white">
    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
        <div className="flex items-center gap-4 px-4 py-7 md:justify-center">
        <FiTruck className="shrink-0 text-2xl text-amber-600" />

        <div>
            <h3 className="font-semibold text-gray-900">Reliable Delivery</h3>

            <p className="mt-1 text-sm text-gray-500">
            Convenient delivery for your order.
            </p>
        </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-7 md:justify-center">
        <FiShield className="shrink-0 text-2xl text-amber-600" />

        <div>
            <h3 className="font-semibold text-gray-900">Secure Shopping</h3>

            <p className="mt-1 text-sm text-gray-500">
            Your account and orders stay protected.
            </p>
        </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-7 md:justify-center">
        <FiShoppingBag className="shrink-0 text-2xl text-amber-600" />

        <div>
            <h3 className="font-semibold text-gray-900">Premium Selection</h3>

            <p className="mt-1 text-sm text-gray-500">
            Explore carefully selected fragrances.
            </p>
        </div>
        </div>
    </div>
    </section>

    <Footer />
</div>
);
}
