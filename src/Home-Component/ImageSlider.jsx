import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ImageSlider() {
const [currentImage, setCurrentImage] = useState(0);

const images = [
{
    id: "1",
    src: "/ImageSlider/Dior-Savage.jpg",
    alt: "a Male ",
},
{
    id: "2",
    src: "/ImageSlider/Male.jpg",
    alt: "a male",
},
{
    id: "3",
    src: "/ImageSlider/Gentleman.jpg",
    alt: "a male",
},
{
    id: "4",
    src: "/ImageSlider/Woman-a.jpg",
    alt: "a woman",
},
{
    id: "5",
    src: "/ImageSlider/Woman-b.jpg",
    alt: "a woman",
},
{
    id: "6",
    src: "/ImageSlider/woman.jpg",
    alt: "a woman",
},
{
    id: "7",
    src: "/ImageSlider/Uni.jpg",
    alt: "a unisex",
},
{
    id: "8",
    src: "/ImageSlider/Uni-3.jpg",
    alt: "a unisex",
},
{
    id: "9",
    src: "/ImageSlider/Uni-2.jpg",
    alt: "a unisex",
},
{
    id: "10",
    src: "/ImageSlider/New-1.jpg",
    alt: "a new arrival",
},
{
    id: "11",
    src: "/ImageSlider/New-2.jpg",
    alt: "a new arrival",
},
{
    id: "12",
    src: "/ImageSlider/New-3.jpg",
    alt: "a new arrival",
},
];

useEffect(() => {
const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
}, 5000);

return () => clearInterval(interval);
}, [images.length]);

return (
<div className="relative aspect-video w-full overflow-hidden rounded-lg">
    <AnimatePresence mode="wait">
    <motion.img
        key={images[currentImage].id}
        src={images[currentImage].src}
        alt={images[currentImage].alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 h-full w-full object-cover rounded-lg saturate-100"
    />
    </AnimatePresence>
</div>
);
}
