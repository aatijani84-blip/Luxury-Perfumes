import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiArrowLeft, FiPackage, FiShoppingBag } from "react-icons/fi";
import { supabase } from "../../Auth/supabase";

export function OrderDetails() {
const { orderId } = useParams();
const navigate = useNavigate();

const [order, setOrder] = useState(null);
const [orderItems, setOrderItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchOrder = async () => {
    setLoading(true);

    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    navigate("/login");
    return;
    }

    const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

    if (orderError) {
    console.error("Error fetching order:", orderError);
    setLoading(false);
    return;
    }

    const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .select(
        `
                id,
                quantity,
                price,
                perfume_id,
                perfumes (
                    id,
                    name,
                    brand,
                    image
                )
            `,
    )
    .eq("order_id", orderId);

    if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    setLoading(false);
    return;
    }

    setOrder(orderData);
    setOrderItems(itemsData || []);
    setLoading(false);
};

fetchOrder();
}, [orderId, navigate]);

if (loading) {
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <p className="text-gray-500">Loading order details...</p>
    </div>
);
}

if (!order) {
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div className="text-center">
        <FiPackage className="mx-auto mb-4 text-5xl text-gray-400" />

        <h1 className="text-xl font-bold text-gray-700">Order not found</h1>

        <button
        type="button"
        onClick={() => navigate("/orders")}
        className="mt-5 rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
        >
        Back to Orders
        </button>
    </div>
    </div>
);
}

return (
<>
    <title>ORDER #{order.id}</title>

    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-6 sm:py-8">
    <div className="mx-auto w-full max-w-4xl">
        <button
        type="button"
        onClick={() => navigate("/orders")}
        className="mb-5 flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:px-4 sm:text-base"
        >
        <FiArrowLeft />
        <span>Back to Orders</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
        <div className="border-b px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                <FiPackage className="text-xl text-gray-600" />

                <h1 className="text-xl font-bold text-gray-700 sm:text-2xl">
                    Order #{order.id}
                </h1>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
                </p>
            </div>

            <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold capitalize text-yellow-700">
                {order.status}
            </span>
            </div>
        </div>

        <div className="divide-y">
            {orderItems.map((item) => (
            <div
                key={item.id}
                className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 sm:py-6"
            >
                <img
                src={item.perfumes.image}
                alt={item.perfumes.name}
                className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
                />

                <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-gray-700 sm:text-lg">
                    {item.perfumes.name}
                </h2>

                <p className="text-sm text-gray-500">
                    {item.perfumes.brand}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                </p>
                </div>

                <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">
                    ${Number(item.price).toFixed(2)} each
                </p>

                <p className="mt-1 font-bold text-gray-700">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
                </div>
            </div>
            ))}
        </div>

        <div className="border-t bg-gray-50 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-700">Total</span>

            <span className="text-xl font-bold text-gray-800 sm:text-2xl">
                ${Number(order.total_amount).toFixed(2)}
            </span>
            </div>
        </div>
        </div>
    </div>
    </div>
</>
);
}
