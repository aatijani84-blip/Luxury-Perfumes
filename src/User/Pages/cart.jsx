import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
FiShoppingCart,
FiArrowLeft,
FiMinus,
FiPlus,
FiTrash2,
} from "react-icons/fi";
import { supabase } from "../../Auth/supabase";

export function Cart() {
const navigate = useNavigate();

const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);
const [updatingItem, setUpdatingItem] = useState(null);

useEffect(() => {
const fetchCart = async () => {
    setLoading(true);

    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    setCartItems([]);
    setLoading(false);
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
}, []);

const updateQuantity = async (itemId, newQuantity) => {
if (newQuantity < 1) {
    return;
}

setUpdatingItem(itemId);

const { error } = await supabase
    .from("cart_items")
    .update({
    quantity: newQuantity,
    })
    .eq("id", itemId);

if (error) {
    console.error("Error updating quantity:", error);
    setUpdatingItem(null);
    return;
}

setCartItems((items) =>
    items.map((item) =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item,
    ),
);

setUpdatingItem(null);
};

const removeItem = async (itemId) => {
setUpdatingItem(itemId);

const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

if (error) {
    console.error("Error removing item:", error);
    setUpdatingItem(null);
    return;
}

setCartItems((items) => items.filter((item) => item.id !== itemId));

setUpdatingItem(null);
};

const total = cartItems.reduce((sum, item) => {
return sum + Number(item.perfumes.price) * item.quantity;
}, 0);

return (
<>
    <title>YOUR CART</title>

    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-6 sm:py-8">
    <div className="mx-auto w-full max-w-5xl">
        <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:px-4 sm:text-base"
        >
        <FiArrowLeft />
        <span>Back</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-4 sm:px-6 sm:py-5">
            <FiShoppingCart className="text-xl text-gray-600 sm:text-2xl" />

            <h1 className="text-xl font-bold text-gray-700 sm:text-2xl">
            YOUR CART
            </h1>
        </div>

        {loading && (
            <div className="px-4 py-10 text-center text-gray-500 sm:px-6">
            Loading your cart...
            </div>
        )}

        {!loading && cartItems.length === 0 && (
            <div className="px-4 py-10 text-center sm:px-6">
            <FiShoppingCart className="mx-auto mb-4 text-5xl text-gray-400" />

            <h2 className="text-lg font-bold text-gray-700 sm:text-xl">
                Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Add some perfumes to your cart.
            </p>

            <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 sm:w-auto sm:text-base"
            >
                Continue Shopping
            </button>
            </div>
        )}

        {!loading && cartItems.length > 0 && (
            <>
            {cartItems.map((item) => (
                <div
                key={item.id}
                className="border-b px-4 py-5 sm:px-6 sm:py-6"
                >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <img
                        src={item.perfumes.image}
                        alt={item.perfumes.name}
                        className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
                    />

                    <div className="min-w-0">
                        <h2 className="truncate text-base font-bold text-gray-700 sm:text-lg">
                        {item.perfumes.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                        {item.perfumes.brand}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-600 sm:text-base">
                        ${Number(item.perfumes.price).toFixed(2)}
                        </p>
                    </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center overflow-hidden rounded-lg border">
                        <button
                        type="button"
                        disabled={updatingItem === item.id}
                        onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
                        >
                        <FiMinus />
                        </button>

                        <span className="px-3 text-sm font-semibold sm:px-4 sm:text-base">
                        {item.quantity}
                        </span>

                        <button
                        type="button"
                        disabled={updatingItem === item.id}
                        onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
                        >
                        <FiPlus />
                        </button>
                    </div>

                    <p className="text-base font-bold text-gray-700 sm:min-w-24 sm:text-right sm:text-lg">
                        $
                        {(
                        Number(item.perfumes.price) * item.quantity
                        ).toFixed(2)}
                    </p>

                    <button
                        type="button"
                        disabled={updatingItem === item.id}
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                        <FiTrash2 />
                        <span>Remove</span>
                    </button>
                    </div>
                </div>
                </div>
            ))}

            <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between">
                <p className="text-lg font-bold text-gray-700 sm:text-xl">
                Total: ${total.toFixed(2)}
                </p>

                <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full rounded-lg bg-gray-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-gray-800 md:w-auto"
                >
                Checkout
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
