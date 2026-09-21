import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Modal} from './Modal';

export function Description() {
    const perfumes = [
        {
            id: crypto.randomUUID(),
            name: "Men's Perfume",
            description: "A timeless classic with a sophisticated blend of floral and woody notes."
        },
        {
            id: crypto.randomUUID(),
            name: "Women's Perfume",
            description: "A romantic and feminine fragrance with a blend of floral and fruity notes."
        },
        {
            id: crypto.randomUUID(),
            name: "Unisex Perfume",
            description: "A versatile scent that appeals to everyone with a balanced mix of oriental and woody notes."
        },
        {
            id: crypto.randomUUID(),
            name: 'New Arrivals',  
            description: 'Discover our latest collection of perfumes, featuring fresh and innovative scents for every preference.'
        }
    ];

    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isModalOpen) return; // Pause cycling when modal is open

            setFeaturedIndex((prevIndex) => (prevIndex + 1) % perfumes.length);
        }, 15000); // Cycle every 15 seconds

        return () => clearInterval(interval); // Cleanup
    }, [perfumes.length, isModalOpen]);

    return (
        <>
            {/* Featured description (cycles) */}
            <AnimatePresence mode="wait">
            <motion.div
                key={featuredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="p-20 text-center w-full h-full bg-gray-100  flex items-center justify-center flex-col backdrop-contrast-125"
            >
                <h2 className="xl:text-8xl sm:text-3xl md:text-5xl font-bold">{perfumes[featuredIndex].name}</h2>
                    <p className="xl:text-lg sm:text-sm md:text-base">{perfumes[featuredIndex].description}</p>

                    <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-600" >
                        Shop Now
                    </button>
                </motion.div>
            </AnimatePresence>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}