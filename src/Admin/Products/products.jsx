import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../Auth/supabase";
import { AdminSidebar } from "../Home-Component/admin-sidebar";

export function AdminProducts() {
const [perfumes, setPerfumes] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
const loadProducts = async () => {
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    navigate("/Login");
    return;
    }

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

    if (profileError || profile?.role !== "admin") {
    navigate("/");
    return;
    }

    const { data, error } = await supabase
    .from("perfumes")
    .select("*")
    .order("created_at", { ascending: false });

    if (error) {
    console.error("Error loading perfumes:", error);
    setLoading(false);
    return;
    }

    setPerfumes(data);
    setLoading(false);
};

loadProducts();
}, [navigate]);

const filteredPerfumes = perfumes.filter(
(perfume) =>
    perfume.name.toLowerCase().includes(search.toLowerCase()) ||
    perfume.brand.toLowerCase().includes(search.toLowerCase()),
);

if (loading) {
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <p className="text-gray-600">Loading products...</p>
    </div>
);
}

return (
<div className="min-h-screen bg-gray-100">
    <AdminSidebar />

    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:ml-64 lg:px-8">
    <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
            Admin
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
            Products
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage the perfumes in your store.
            </p>
        </div>

        <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-900 sm:w-auto"
        >
            <FiPlus />
            Add Product
        </button>
        </div>

        <div className="mb-6 rounded-xl bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by perfume name or brand..."
            className="w-full rounded-lg border-2 border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-400 sm:text-base"
            />
        </div>
        </div>

        {filteredPerfumes.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-gray-500">No perfumes found.</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredPerfumes.map((perfume) => (
            <div
                key={perfume.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
                <img
                src={perfume.image}
                alt={perfume.name}
                className="h-60 w-full object-cover sm:h-64"
                />

                <div className="p-4 sm:p-5">
                <p className="text-sm font-medium text-amber-600">
                    {perfume.brand}
                </p>

                <h2 className="mt-1 line-clamp-2 min-h-14 text-lg font-bold text-gray-800">
                    {perfume.name}
                </h2>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-bold text-gray-800">
                    ₵{Number(perfume.price).toFixed(2)}
                    </p>

                    <p className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                    {perfume.gender}
                    </p>
                </div>

                <div className="mt-4 flex gap-2">
                    <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                    <FiEdit />
                    Edit
                    </button>

                    <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-red-100 px-3 py-2.5 text-red-600 transition hover:bg-red-200"
                    >
                    <FiTrash2 />
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
    </main>
</div>
);
}
