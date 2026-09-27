import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { Modal } from "./Modal";

export function Description() {
const perfumes = [
{
    id: "1",
    name: "Men's Perfume",
    description:
    "A timeless classic with a sophisticated blend of floral and woody notes.",
},
{
    id: "2",
    name: "Women's Perfume",
    description:
    "A romantic and feminine fragrance with a blend of floral and fruity notes.",
},
{
    id: "3",
    name: "Unisex Perfume",
    description:
    "A versatile scent that appeals to everyone with a balanced mix of oriental and woody notes.",
},
{
    id: "4",
    name: "New Arrivals",
    description:
    "Discover our latest collection of perfumes, featuring fresh and innovative scents for every preference.",
},
];

const [featuredIndex, setFeaturedIndex] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
const interval = setInterval(() => {
    if (isModalOpen) return;

    setFeaturedIndex((prevIndex) => (prevIndex + 1) % perfumes.length);
}, 15000);

return () => clearInterval(interval);
}, [perfumes.length, isModalOpen]);

const currentPerfume = perfumes[featuredIndex];

return (
<>
    <div className="relative flex h-full min-h-105 w-full items-center justify-center overflow-hidden bg-gray-950 px-5 py-12 text-white sm:min-h-120 sm:px-8 lg:min-h-full lg:px-10">
    {/* Decorative background */}
    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl sm:h-72 sm:w-72" />

    <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-600/10 blur-3xl sm:h-72 sm:w-72" />

    <div className="absolute right-8 top-8 text-amber-400/20 sm:right-12 sm:top-12">
        <FiStar className="text-5xl sm:text-6xl" />
    </div>

    <AnimatePresence mode="wait">
        <motion.div
        key={currentPerfume.id}
        initial={{
            opacity: 0,
            y: 15,
        }}
        animate={{
            opacity: 1,
            y: 0,
        }}
        exit={{
            opacity: 0,
            y: -15,
        }}
        transition={{
            duration: 0.8,
            ease: "easeOut",
        }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
        >
        {/* Small heading */}
        <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500 sm:w-10" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400 sm:text-xs">
            Featured Collection
            </p>

            <span className="h-px w-8 bg-amber-500 sm:w-10" />
        </div>

        {/* Main title */}
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            {currentPerfume.name}
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-md text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
            {currentPerfume.description}
        </p>

        {/* Button */}
        <motion.button
            type="button"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-500 sm:px-7 sm:py-3.5"
        >
            Explore Collection
            <FiArrowRight className="text-base" />
        </motion.button>

        {/* Slide indicators */}
        <div className="mt-8 flex items-center gap-2">
            {perfumes.map((perfume, index) => (
            <button
                key={perfume.id}
                type="button"
                aria-label={`Show ${perfume.name}`}
                onClick={() => setFeaturedIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                index === featuredIndex
                    ? "w-8 bg-amber-500"
                    : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
            />
            ))}
        </div>

        {/* Counter */}
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
            {String(featuredIndex + 1).padStart(2, "0")} /{" "}
            {String(perfumes.length).padStart(2, "0")}
        </p>
        </motion.div>
    </AnimatePresence>
    </div>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
</>
);
}
