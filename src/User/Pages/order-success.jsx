import { useNavigate } from "react-router";
import { FiCheckCircle, FiShoppingBag, FiPackage } from "react-icons/fi";

export function OrderSuccess() {
const navigate = useNavigate();

return (
<>
    <title>ORDER SUCCESSFUL</title>

    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <FiCheckCircle className="text-5xl text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-700 sm:text-3xl">
        Order Successful!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
        Thank you for your purchase. Your order has been placed
        successfully.
        </p>

        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-left">
        <div className="flex items-center gap-3">
            <FiPackage className="text-2xl text-gray-600" />

            <div>
            <p className="font-semibold text-gray-700">Order Confirmed</p>

            <p className="text-sm text-gray-500">
                Your order has been saved successfully.
            </p>
            </div>
        </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
        >
            <FiShoppingBag />
            Continue Shopping
        </button>

        <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100"
        >
            <FiPackage />
            View Orders
        </button>
        </div>
    </div>
    </div>
</>
);
}
