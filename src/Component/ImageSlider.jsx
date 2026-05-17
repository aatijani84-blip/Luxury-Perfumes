import { useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageSlider() { 
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Dior-Sauvage.jpg",
            alt: "a Male "
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Malee.jpg",
            alt: "a male"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Gentleman.jpg",
            alt: "a male"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Woman-a.jpg",
            alt: "a woman"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Woman-b.jpg",
            alt: "a woman"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/woman.jpg",
            alt: "a woman"
        },
        {
            id: crypto.randomUUID(),
            src:"/ImageSlider/Uni.jpg",
            alt: "a unisex"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Uni-3.jpg",
            alt: "a unisex"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/Uni-2.jpg",
            alt: "a unisex"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/New-1.jpg",
            alt: "a new arrival"
        },
        {
            id: crypto.randomUUID(),
            src: "/ImageSlider/New-2.jpg",
            alt: "a new arrival"
        },
        {
            id: crypto.randomUUID(),    
            src: "/ImageSlider/New-3.jpg",
            alt: "a new arrival"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <div className="relative aspect-square w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[currentImage].id}       
                    src={images[currentImage].src}
                    alt={images[currentImage].alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 block rounded-lg"
                />
            </AnimatePresence>
        </div>
    )
}