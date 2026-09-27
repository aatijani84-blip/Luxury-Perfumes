import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";
import {
FiX,
FiUser,
FiHeart,
FiUsers,
FiStar,
FiArrowRight,
} from "react-icons/fi";

export function Modal({ isOpen, onClose }) {
const categories = [
{
    name: "Men's Perfumes",
    description: "Bold and sophisticated fragrances",
    path: "/Male-Perfume",
    icon: FiUser,
},
{
    name: "Women's Perfumes",
    description: "Elegant and captivating scents",
    path: "/women-perfumes",
    icon: FiHeart,
},
{
    name: "Unisex Perfumes",
    description: "Versatile fragrances for everyone",
    path: "/unisex-perfumes",
    icon: FiUsers,
},
{
    name: "New Arrivals",
    description: "Discover our latest fragrances",
    path: "/new-arrivals",
    icon: FiStar,
},
];

return (
<AnimatePresence>
    {isOpen && (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm sm:px-6"
    >
        <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
            duration: 0.25,
            ease: "easeOut",
        }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        >
        {/* Header */}
        <div className="border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">
            <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:right-5 sm:top-5"
            >
            <FiX className="text-xl" />
            </button>

            <div className="pr-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
                Explore
            </p>

            <h2
                id="category-title"
                className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            >
                Find Your Fragrance
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Choose a collection and discover a scent that matches your
                style.
            </p>
            </div>
        </div>

        {/* Categories */}
        <div className="p-4 sm:p-5">
            <div className="space-y-2">
            {categories.map((category) => {
                const Icon = category.icon;

                return (
                <NavLink
                    key={category.name}
                    to={category.path}
                    onClick={onClose}
                    className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition duration-200 hover:border-amber-200 hover:bg-amber-50/60 sm:p-5"
                >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition group-hover:bg-amber-100 group-hover:text-amber-600 sm:h-12 sm:w-12">
                    <Icon className="text-xl" />
                    </div>

                    <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 transition group-hover:text-amber-700">
                        {category.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        {category.description}
                    </p>
                    </div>

                    <FiArrowRight className="shrink-0 text-gray-300 transition duration-200 group-hover:translate-x-1 group-hover:text-amber-600" />
                </NavLink>
                );
            })}
            </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-7">
            <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
            >
            Close
            </button>
        </div>
        </motion.div>
    </motion.div>
    )}
</AnimatePresence>
);
}
