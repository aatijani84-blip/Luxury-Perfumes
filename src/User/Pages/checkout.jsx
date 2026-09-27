import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowLeft, FiCheckCircle, FiShoppingCart } from "react-icons/fi";
import { supabase } from "../../Auth/supabase";

export function Checkout() {
const navigate = useNavigate();

const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);
const [placingOrder, setPlacingOrder] = useState(false);

useEffect(() => {
const fetchCart = async () => {
    setLoading(true);

    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    navigate("/login");
    return;
    }

    const { data, error } = await supabase
    .from("cart_items")
    .select(
        `
            id,
            quantity,
            perfume_id,
            perfumes (
                id,
                name,
                brand,
                price,
                image
            )
        `,
    )
    .eq("user_id", user.id);

    if (error) {
    console.error("Error fetching cart:", error);
    setLoading(false);
    return;
    }

    setCartItems(data || []);
    setLoading(false);
};

fetchCart();
}, [navigate]);

const total = cartItems.reduce((sum, item) => {
return sum + Number(item.perfumes.price) * item.quantity;
}, 0);

const handlePlaceOrder = async () => {
if (cartItems.length === 0) {
    return;
}

setPlacingOrder(true);

const {
    data: { user },
} = await supabase.auth.getUser();

if (!user) {
    navigate("/login");
    return;
}

const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
    user_id: user.id,
    total_amount: total,
    status: "pending",
    })
    .select()
    .single();

if (orderError) {
    console.error("Error creating order:", orderError);
    setPlacingOrder(false);
    return;
}

const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    perfume_id: item.perfume_id,
    quantity: item.quantity,
    price: Number(item.perfumes.price),
}));

const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

if (itemsError) {
    console.error("Error creating order items:", itemsError);
    setPlacingOrder(false);
    return;
}

const { error: cartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

if (cartError) {
    console.error("Error clearing cart:", cartError);
    setPlacingOrder(false);
    return;
}

setCartItems([]);
setPlacingOrder(false);

navigate("/order-success", { state: { orderId: order.id } });
};

if (loading) {
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <p className="text-gray-500">Loading checkout...</p>
    </div>
);
}

return (
<>
    <title>CHECKOUT</title>

    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-6 sm:py-8">
    <div className="mx-auto w-full max-w-4xl">
        <button
        type="button"
        onClick={() => navigate("/cart")}
        className="mb-5 flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:px-4 sm:text-base"
        >
        <FiArrowLeft />
        <span>Back to Cart</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-4 sm:px-6 sm:py-5">
            <FiShoppingCart className="text-xl text-gray-600 sm:text-2xl" />

            <h1 className="text-xl font-bold text-gray-700 sm:text-2xl">
            CHECKOUT
            </h1>
        </div>

        {cartItems.length === 0 ? (
            <div className="px-4 py-12 text-center sm:px-6">
            <FiCheckCircle className="mx-auto mb-4 text-5xl text-gray-400" />

            <h2 className="text-lg font-bold text-gray-700 sm:text-xl">
                Your cart is empty
            </h2>

            <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 w-full rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto"
            >
                Continue Shopping
            </button>
            </div>
        ) : (
            <>
            <div className="divide-y">
                {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-5 sm:gap-5 sm:px-6"
                >
                    <img
                    src={item.perfumes.image}
                    alt={item.perfumes.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
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

                    <p className="text-sm font-bold text-gray-700 sm:text-base">
                    $
                    {(Number(item.perfumes.price) * item.quantity).toFixed(
                        2,
                    )}
                    </p>
                </div>
                ))}
            </div>

            <div className="border-t bg-gray-50 px-4 py-5 sm:px-6 sm:py-6">
                <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700 sm:text-xl">
                    Total
                </span>

                <span className="text-xl font-bold text-gray-800 sm:text-2xl">
                    ${total.toFixed(2)}
                </span>
                </div>

                <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full rounded-lg bg-gray-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
            </div>
            </>
        )}
        </div>
    </div>
    </div>
</>
);
}
