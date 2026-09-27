import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router';

export function Modal({isOpen, onClose}) {


    return (
            <AnimatePresence>
            {isOpen && (  
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-40 rounded-lg shadow-lg"
                        onClick={onClose} // Close modal when clicking outside
                    >

                    <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                            role="dialog"
                            aria-modal="true"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 w-96"   
                        >
                        
                            < div className = 'py-4 border-b-2 border-b-amber-400' >
                                <h2 className='text-center text-2xl' > Categories </h2>
                            </div>
                            <div className='border-b-2 px-6 py-6 border-b-amber-400 hover:border-b-gray-500 gap-2 cursor-pointer hover:text-gray-500' >
                                <NavLink to = "/Male-Perfumes" className = 'text-center hover:text-gray-500'> Men 's Perfumes </NavLink> 
                            </div>
                            <div className = 'border-b-2 border-b-amber-400 px-6 py-6 cursor-pointer hover:border-b-gray-500 hover:text-gray-500' >
                                <NavLink to="/women-perfumes" className = 'text-center hover:text-gray-500' > Women 's Perfumes</NavLink> 
                            </div>
                            <div className='border-b-2 px-6 py-6 border-b-amber-400 hover:border-b-gray-500 cursor-pointer hover:text-gray-500' >
                                <NavLink to="/unisex-perfumes" className = 'text-center hover:text-gray-500' > Unisex Perfumes </NavLink> 
                            </div>
                            <div className='px-6 py-6 border-b-2 border-b-amber-400 hover:border-b-gray-500 cursor-pointer hover:text-gray-500' >
                                <NavLink to="/new-arrivals" className = 'text-center hover:text-gray-500' > New Arrivals </NavLink> 
                            </div>
                        <button onClick={onClose} className=" mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-600 flex ">
                            <span>Close</span>
                        </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>  
    )

}


