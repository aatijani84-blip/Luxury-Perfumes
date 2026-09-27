import { NavLink, useNavigate } from "react-router";
import {
FiHome,
FiShoppingBag,
FiUsers,
FiLogOut,
} from "react-icons/fi";
import { MdStore } from "react-icons/md";
import { supabase } from "../../Auth/supabase";

export function AdminSidebar() {
const navigate = useNavigate();

const handleLogout = async () => {
const { error } = await supabase.auth.signOut();

if (error) {
    console.error("Logout error:", error);
    return;
}

navigate("/Login");
};

const links = [
{
    name: "Dashboard",
    path: "/admin",
    icon: <FiHome />,
},
{
    name: "Products",
    path: "/admin/products",
    icon: <FiShoppingBag />,
},
{
    name: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingBag />,
},
{
    name: "Customers",
    path: "/admin/customers",
    icon: <FiUsers />,
},
];

return (
<aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-gray-900 text-white">
    <div className="border-b border-gray-700 px-6 py-6">
    <h1 className="text-xl font-bold tracking-wide">LUXURY PERFUMES</h1>

    <p className="mt-1 text-sm text-gray-400">Admin Panel</p>
    </div>

    <nav className="flex-1 space-y-2 px-4 py-6">
    {links.map((link) => (
        <NavLink
        key={link.path}
        to={link.path}
        end={link.path === "/admin"}
        className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition ${
            isActive
                ? "bg-amber-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
        }
        >
        <span className="text-xl">{link.icon}</span>

        <span>{link.name}</span>
        </NavLink>
    ))}
    </nav>

    <div className="space-y-2 border-t border-gray-700 p-4">
    <NavLink
        to="/"
        className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
    >
        <MdStore size={40} color="black" />
        <span>View Store</span>
    </NavLink>

    <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-300 transition hover:bg-red-600 hover:text-white"
    >
        <FiLogOut className="text-xl" />
        <span>Logout</span>
    </button>
    </div>
</aside>
);
}
