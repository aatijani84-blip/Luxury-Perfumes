import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowLeft, FiPackage, FiShoppingBag } from "react-icons/fi";
import { supabase } from "../../Auth/supabase";

export function Orders() {
const navigate = useNavigate();

const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchOrders = async () => {
    setLoading(true);

    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    navigate("/login");
    return;
    }

    const { data, error } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

    if (error) {
    console.error("Error fetching orders:", error);
    setLoading(false);
    return;
    }

    setOrders(data || []);
    setLoading(false);
};

fetchOrders();
}, [navigate]);

return (
<>
    <title>MY ORDERS</title>

    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-6 sm:py-8">
    <div className="mx-auto w-full max-w-4xl">
        <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-5 flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:px-4 sm:text-base"
        >
        <FiArrowLeft />
        <span>Back</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-4 sm:px-6 sm:py-5">
            <FiPackage className="text-xl text-gray-600 sm:text-2xl" />

            <h1 className="text-xl font-bold text-gray-700 sm:text-2xl">
            MY ORDERS
            </h1>
        </div>

        {loading && (
            <div className="px-4 py-10 text-center text-gray-500 sm:px-6">
            Loading your orders...
            </div>
        )}

        {!loading && orders.length === 0 && (
            <div className="px-4 py-12 text-center sm:px-6">
            <FiShoppingBag className="mx-auto mb-4 text-5xl text-gray-400" />

            <h2 className="text-lg font-bold text-gray-700 sm:text-xl">
                No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Your completed orders will appear here.
            </p>

            <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 w-full rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto"
            >
                Start Shopping
            </button>
            </div>
        )}

        {!loading && orders.length > 0 && (
            <div className="divide-y">
            {orders.map((order) => (
                <div
                key={order.id}
                className="flex flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between"
                >
                <div>
                    <div className="flex items-center gap-2">
                    <FiPackage className="text-gray-500" />

                    <h2 className="font-bold text-gray-700">
                        Order #{order.id}
                    </h2>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                    ${Number(order.total_amount).toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold capitalize text-yellow-700">
                    {order.status}
                    </span>

                    <button
                    type="button"
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto"
                    >
                    View Details
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    </div>
    </div>
</>
);
}
