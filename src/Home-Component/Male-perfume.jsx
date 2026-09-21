import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { supabase } from "../Auth/supabase" 
import { Footer } from "./footer";

export function MalePerfume() {
    const [malePerfumes, setMalePerfumes] = useState([]);
    const [search, setSearch] = useState("");
    const [clickedPerfume, setClickedPerfume] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("perfumes")
            .select("*")
            .eq("gender", "male");

        if (error) {
            console.error("Error fetching male perfume data:", error);
            return;
        }

        console.log(data);
        setMalePerfumes(data);
    };

    fetchData();
}, []);


    const handleAddToCart = (perfume) => {
        setClickedPerfume(perfume.id);

        console.log(`Added ${perfume.name} to cart!`);

        setTimeout(() => {
            setClickedPerfume(null);
        }, 1000);
    };

    const filteredPerfumes = malePerfumes.filter((perfume) =>
        `${perfume.name} ${perfume.brand}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <>
            <title>MEN'S PERFUMES</title>

            {/* Header */}
            <header className="sticky top-0 z-50 border-b-2 border-amber-400 bg-white/90 backdrop-blur-md">
                <h1 className="bg-gray-700 px-4 py-6 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-7xl">
                    Men's Perfumes
                </h1>

                {/* Navigation/Search */}
                <div className="flex w-full flex-col items-center justify-between gap-4 bg-gray-100 px-4 py-4 md:flex-row">

                    <NavLink
                        to="/"
                        className="text-2xl font-bold text-gray-500 transition-colors duration-200 hover:text-gray-800 sm:text-3xl"
                    >
                        LUXURY PERFUMES
                    </NavLink>

                    <div className="flex w-full max-w-xl">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-l-lg border-2 border-amber-400 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-300"
                            placeholder="Search perfumes..."
                        />

                        <button
                            type="button"
                            className="rounded-r-lg bg-gray-500 px-5 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </header>

            {/* Product Count */}
            <div className="px-4 pt-6">
                <h2 className="text-xl font-bold text-gray-700">
                    Men's Collection
                </h2>

                <p className="text-gray-500">
                    {filteredPerfumes.length} perfume
                    {filteredPerfumes.length !== 1 ? "s" : ""} found
                </p>
            </div>

            {/* Product Grid */}
            <main className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {filteredPerfumes.map((perfume) => (
                    <div
                        key={perfume.id}
                        className="flex min-h-120 flex-col overflow-hidden rounded-xl border border-amber-400 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                        {/* Image */}
                        <div className="h-64 w-full overflow-hidden bg-gray-100">
                            <img
                                src={perfume.image}
                                alt={perfume.name}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Product Information */}
                        <div className="flex flex-1 flex-col p-4">

                            <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
                                {perfume.name}
                            </h2>

                            <p className="mb-2 text-center text-gray-500">
                                Brand: {perfume.brand}
                            </p>

                            <p className="text-center text-sm text-gray-500">
                                Release Year: {perfume.release_year}
                            </p>

                            <p className="mt-3 text-center text-2xl font-bold text-green-600">
                                GH₵
                                {Number(perfume.price || 0).toFixed(2)}
                            </p>

                            {/* Push button to bottom */}
                            <div className="mt-auto pt-5">
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(perfume)}
                                    className={`w-full rounded-lg px-6 py-2 font-semibold text-white transition-colors duration-200 ${
                                        clickedPerfume === perfume.id
                                            ? "bg-green-600"
                                            : "bg-gray-500 hover:bg-gray-700"
                                    }`}
                                >
                                    {clickedPerfume === perfume.id
                                        ? "Added!"
                                        : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* No Search Results */}
            {filteredPerfumes.length === 0 && (
                <div className="flex min-h-60 items-center justify-center px-4">
                    <p className="text-center text-xl text-gray-500">
                        No perfumes found.
                    </p>
                </div>
            )}

            <Footer />
        </>
    );
}
