import { NavLink } from 'react-router';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

export function Footer() { 
    return (
            <footer className= "bg-gray-600 text-white py-8 border-t-2 border-amber-400 pl-3.5 md:pl-3.5" >
                <div className= "max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:grid-cols-1" >

                <div>
                        <NavLink to = "/" >
                        <h2 className="text-xl font-bold hover:underline hover:" > Luxury Perfumes </h2>
                        </NavLink>
                    <p className="text-sm" > Your Smell, Our Priority </p>
                    <div className="flex space-x-4 mt-4" >
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-800">
                            <FontAwesomeIcon icon={faFacebook} className="fa-lg" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                            <FontAwesomeIcon icon={faTwitter} className="fa-lg" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-950">
                            <FontAwesomeIcon icon={faInstagram} className="fa-lg" />
                        </a>
                    </div>
                </div>
                <div>
                        <h3 className="font-semibold mb-2" > Quick Links </h3>
                        <ul className="space-y-1" >
                            <li> <NavLink to = "/about" className="hover:underline" > About </NavLink></li>
                            <li> <NavLink to = "/shop" className="hover:underline" > Shop </NavLink></li>
                            <li> <NavLink to = "/contact" className="hover:underline" > Contact </NavLink></li>
                        </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold mb-2" > Contact Us </h3>
                    <p> Email: luxuryperfumes@gmail.com </p>
                    <p> Phone: +233 245 361 908</p>
                    <p> Address: 145 Linden Street, Kumasi, Ghana </p>
                </div>
                </div>

                <div className="text-center mt-6 text-sm pt-6" >
                &copy; 2026 Luxury Perfumes.All rights reserved.
                    <NavLink to="/privacy" className="ml-2" > Privacy Policy </NavLink>
                    <span className="ml-0.5">|</span>
                    <NavLink to="/terms" className="ml-2" > Terms of Service </NavLink>
                </div>
        </footer >
    )
}