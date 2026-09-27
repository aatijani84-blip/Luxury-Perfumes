import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = [
{
id: "1",
src: "/ImageSlider/Dior-Savage.jpg",
alt: "Dior Sauvage men's perfume",
category: "Men's Collection",
},
{
id: "2",
src: "/ImageSlider/Male.jpg",
alt: "Men's perfume",
category: "Men's Collection",
},
{
id: "3",
src: "/ImageSlider/Gentleman.jpg",
alt: "Gentleman perfume",
category: "Men's Collection",
},
{
id: "4",
src: "/ImageSlider/Woman-a.jpg",
alt: "Women's perfume",
category: "Women's Collection",
},
{
id: "5",
src: "/ImageSlider/Woman-b.jpg",
alt: "Women's perfume",
category: "Women's Collection",
},
{
id: "6",
src: "/ImageSlider/woman.jpg",
alt: "Women's perfume",
category: "Women's Collection",
},
{
id: "7",
src: "/ImageSlider/Uni.jpg",
alt: "Unisex perfume",
category: "Unisex Collection",
},
{
id: "8",
src: "/ImageSlider/Uni-3.jpg",
alt: "Unisex perfume",
category: "Unisex Collection",
},
{
id: "9",
src: "/ImageSlider/Uni-2.jpg",
alt: "Unisex perfume",
category: "Unisex Collection",
},
{
id: "10",
src: "/ImageSlider/New-1.jpg",
alt: "New perfume arrival",
category: "New Arrivals",
},
{
id: "11",
src: "/ImageSlider/New-2.jpg",
alt: "New perfume arrival",
category: "New Arrivals",
},
{
id: "12",
src: "/ImageSlider/New-3.jpg",
alt: "New perfume arrival",
category: "New Arrivals",
},
];

export function ImageSlider() {
const [currentImage, setCurrentImage] = useState(0);

const nextImage = () => {
setCurrentImage((prev) => (prev + 1) % images.length);
};

const previousImage = () => {
setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
};

useEffect(() => {
const interval = setInterval(() => {
    nextImage();
}, 5000);

return () => clearInterval(interval);
}, []);

const image = images[currentImage];

return (
<div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900 sm:aspect-video lg:h-full lg:aspect-auto">
    <AnimatePresence mode="wait">
    <motion.img
        key={image.id}
        src={image.src}
        alt={image.alt}
        initial={{
        opacity: 0,
        scale: 1.05,
        }}
        animate={{
        opacity: 1,
        scale: 1,
        }}
        exit={{
        opacity: 0,
        scale: 1.02,
        }}
        transition={{
        duration: 1,
        ease: "easeInOut",
        }}
        className="absolute inset-0 h-full w-full object-cover"
    />
    </AnimatePresence>

    {/* Dark gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

    {/* Top label */}
    <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
    <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
        Luxury Collection
    </div>
    </div>

    {/* Category */}
    <div className="absolute bottom-16 left-4 right-4 sm:bottom-20 sm:left-6 sm:right-6">
    <motion.div
        key={image.category}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300 sm:text-sm">
        {image.category}
        </p>

        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
        Discover Your Signature Scent
        </h2>
    </motion.div>
    </div>

    {/* Previous button */}
    <button
    type="button"
    onClick={previousImage}
    aria-label="Previous image"
    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-gray-900 sm:left-5 sm:h-11 sm:w-11"
    >
    <FiChevronLeft className="text-xl sm:text-2xl" />
    </button>

    {/* Next button */}
    <button
    type="button"
    onClick={nextImage}
    aria-label="Next image"
    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-gray-900 sm:right-5 sm:h-11 sm:w-11"
    >
    <FiChevronRight className="text-xl sm:text-2xl" />
    </button>

    {/* Bottom controls */}
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:bottom-5 sm:left-6 sm:right-6">
    {/* Indicators */}
    <div className="flex items-center gap-1.5 overflow-hidden">
        {images.map((item, index) => (
        <button
            key={item.id}
            type="button"
            onClick={() => setCurrentImage(index)}
            aria-label={`Show slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
            index === currentImage
                ? "w-7 bg-amber-400"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
        />
        ))}
    </div>

    {/* Counter */}
    <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-md sm:text-xs">
        {String(currentImage + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
    </span>
    </div>
</div>
);
}
