import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import {
FiShoppingBag,
FiUsers,
FiDollarSign,
FiClock,
FiArrowRight,
} from "react-icons/fi";
import { supabase } from "../../Auth/supabase";
import { AdminSidebar } from "../Home-Component/admin-sidebar";

export function AdminHome() {
const [adminName, setAdminName] = useState("");
const [stats, setStats] = useState({
orders: 0,
pending: 0,
customers: 0,
revenue: 0,
});
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
const loadAdminDashboard = async () => {
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    navigate("/Login");
    return;
    }

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", user.id)
    .single();

    if (profileError || profile?.role !== "admin") {
    navigate("/");
    return;
    }

    setAdminName(profile.username || "Admin");

    const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("total_amount, status");

    if (ordersError) {
    console.error("Error loading orders:", ordersError);
    setLoading(false);
    return;
    }

    const { count: customers, error: customersError } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "user");

    if (customersError) {
    console.error("Error loading customers:", customersError);
    }

    const pending = orders.filter(
    (order) => order.status === "pending",
    ).length;

    const revenue = orders.reduce(
    (total, order) => total + Number(order.total_amount),
    0,
    );

    setStats({
    orders: orders.length,
    pending,
    customers: customers || 0,
    revenue,
    });

    setLoading(false);
};

loadAdminDashboard();
}, [navigate]);

const statCards = [
{
    title: "Total Orders",
    value: stats.orders,
    icon: <FiShoppingBag className="text-xl sm:text-2xl" />,
},
{
    title: "Pending Orders",
    value: stats.pending,
    icon: <FiClock className="text-xl sm:text-2xl" />,
},
{
    title: "Customers",
    value: stats.customers,
    icon: <FiUsers className="text-xl sm:text-2xl" />,
},
{
    title: "Total Revenue",
    value: `₵${stats.revenue.toFixed(2)}`,
    icon: <FiDollarSign className="text-xl sm:text-2xl" />,
},
];

if (loading) {
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <p className="text-gray-600">Loading admin dashboard...</p>
    </div>
);
}

return (
<div className="min-h-screen bg-gray-100">
    <AdminSidebar />

    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:ml-64 lg:px-8">
    <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
            Admin Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
            Welcome, {adminName}
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your Luxury Perfumes store from here.
        </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {statCards.map((card) => (
            <div
            key={card.title}
            className="rounded-xl bg-white p-4 shadow-sm sm:p-5"
            >
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 sm:text-base">
                {card.title}
                </p>

                <div className="rounded-lg bg-gray-100 p-2.5 text-gray-700 sm:p-3">
                {card.icon}
                </div>
            </div>

            <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                {card.value}
            </p>
            </div>
        ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 sm:mt-8 sm:gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            Manage Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
            View customer orders and update their status.
            </p>

            <NavLink
            to="/admin/orders"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 sm:px-5 sm:py-3 sm:text-base"
            >
            View Orders
            <FiArrowRight />
            </NavLink>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            View Store
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Go back to the customer-facing store.
            </p>

            <NavLink
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 sm:px-5 sm:py-3 sm:text-base"
            >
            View Store
            <FiArrowRight />
            </NavLink>
        </div>
        </div>
    </div>
    </main>
</div>
);
}
