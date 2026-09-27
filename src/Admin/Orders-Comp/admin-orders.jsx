import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowLeft, FiPackage } from "react-icons/fi";
import { supabase } from "../../Auth/supabase";
import { AdminSidebar } from "../Home-Component/admin-sidebar";

export function AdminOrders() {
const navigate = useNavigate();

const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [updatingOrder, setUpdatingOrder] = useState(null);

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
    .from("orders")
    .select(
        `
        id,
        user_id,
        total_amount,
        status,
        created_at
    `,
    )
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

const updateStatus = async (orderId, status) => {
setUpdatingOrder(orderId);

const { error } = await supabase
    .from("orders")
    .update({
    status,
    })
    .eq("id", orderId);

if (error) {
    console.error("Error updating order status:", error);
    setUpdatingOrder(null);
    return;
}

setOrders((currentOrders) =>
    currentOrders.map((order) =>
    order.id === orderId ? { ...order, status } : order,
    ),
);

setUpdatingOrder(null);
};

return (
<>
    <title>ADMIN ORDERS</title>

    <div className="min-h-screen bg-gray-100">
    <AdminSidebar />

    <main className="min-h-screen px-3 py-5 sm:px-6 sm:py-8 lg:ml-64 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
        <button
            type="button"
            onClick={() => navigate("/admin")}
            className="mb-5 flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:px-4 sm:text-base"
        >
            <FiArrowLeft />
            <span>Back</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
            <div className="flex items-center gap-3 border-b px-4 py-4 sm:px-6 sm:py-5">
            <FiPackage className="text-xl text-gray-600 sm:text-2xl" />

            <h1 className="text-xl font-bold text-gray-700 sm:text-2xl">
                ADMIN ORDERS
            </h1>
            </div>

            {loading && (
            <div className="px-4 py-10 text-center text-gray-500">
                Loading orders...
            </div>
            )}

            {!loading && orders.length === 0 && (
            <div className="px-4 py-12 text-center">
                <FiPackage className="mx-auto mb-4 text-5xl text-gray-400" />

                <h2 className="text-lg font-bold text-gray-700 sm:text-xl">
                No orders yet
                </h2>
            </div>
            )}

            {!loading && orders.length > 0 && (
            <div className="divide-y">
                {orders.map((order) => (
                <div key={order.id} className="px-4 py-5 sm:px-6 sm:py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                        <h2 className="font-bold text-gray-700 sm:text-lg">
                        Order #{order.id}
                        </h2>

                        <p className="mt-1 break-words text-sm text-gray-500">
                        Customer: {order.profiles?.username || "Unknown"}
                        </p>

                        <p className="break-all text-sm text-gray-500">
                        {order.profiles?.email || "No email"}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-gray-700">
                        Total: ₵{Number(order.total_amount).toFixed(2)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold capitalize text-gray-700">
                        {order.status}
                        </span>

                        <select
                        value={order.status}
                        disabled={updatingOrder === order.id}
                        onChange={(event) =>
                            updateStatus(order.id, event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                        <option value="pending">Pending</option>

                        <option value="processing">Processing</option>

                        <option value="shipped">Shipped</option>

                        <option value="delivered">Delivered</option>

                        <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    </main>
    </div>
</>
);
}
