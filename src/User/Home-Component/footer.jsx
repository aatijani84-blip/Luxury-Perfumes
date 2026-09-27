import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faFacebook,
faInstagram,
faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export function Footer() {
return (
<footer className="border-t border-amber-500/40 bg-gray-950 text-white">
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
    {/* Main Footer */}
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
        <NavLink to="/" className="inline-block">
            <h2 className="text-xl font-bold tracking-[0.2em] text-white transition hover:text-amber-400 sm:text-2xl">
            LUXURY
            </h2>

            <p className="mt-1 text-xs font-medium tracking-[0.35em] text-amber-500">
            PERFUMES
            </p>
        </NavLink>

        <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
            Discover carefully selected fragrances designed to express your
            personality, style, and presence.
        </p>

        <p className="mt-4 text-sm font-medium text-amber-400">
            Your Smell, Our Priority.
        </p>

        {/* Social Media */}
        <div className="mt-6 flex items-center gap-3">
            <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
            >
            <FontAwesomeIcon icon={faFacebook} className="text-lg" />
            </a>

            <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
            >
            <FontAwesomeIcon icon={faTwitter} className="text-lg" />
            </a>

            <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-200 hover:border-pink-500 hover:bg-pink-500 hover:text-white"
            >
            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
            </a>
        </div>
        </div>

        {/* Quick Links */}
        <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Quick Links
        </h3>

        <ul className="mt-5 space-y-3">
            <li>
            <NavLink
                to="/about"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                About
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/shop"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                Shop
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/contact"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                Contact
            </NavLink>
            </li>
        </ul>
        </div>

        {/* Collections */}
        <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Collections
        </h3>

        <ul className="mt-5 space-y-3">
            <li>
            <NavLink
                to="/Male-Perfumes"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                Men's Perfumes
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/women-perfumes"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                Women's Perfumes
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/unisex-perfumes"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                Unisex Perfumes
            </NavLink>
            </li>

            <li>
            <NavLink
                to="/new-arrivals"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
                <FiArrowRight className="text-amber-500 transition group-hover:translate-x-1" />
                New Arrivals
            </NavLink>
            </li>
        </ul>
        </div>

        {/* Contact */}
        <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Contact Us
        </h3>

        <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
            <FiMail className="mt-0.5 shrink-0 text-lg text-amber-500" />

            <a
                href="mailto:luxuryperfumes@gmail.com"
                className="break-all text-sm text-gray-400 transition hover:text-white"
            >
                luxuryperfumes@gmail.com
            </a>
            </div>

            <div className="flex items-start gap-3">
            <FiPhone className="mt-0.5 shrink-0 text-lg text-amber-500" />

            <a
                href="tel:+233245361908"
                className="text-sm text-gray-400 transition hover:text-white"
            >
                +233 245 361 908
            </a>
            </div>

            <div className="flex items-start gap-3">
            <FiMapPin className="mt-0.5 shrink-0 text-lg text-amber-500" />

            <p className="text-sm leading-6 text-gray-400">
                145 Linden Street,
                <br />
                Kumasi, Ghana
            </p>
            </div>
        </div>
        </div>
    </div>

    {/* Divider */}
    <div className="my-10 border-t border-gray-800" />

    {/* Bottom Footer */}
    <div className="flex flex-col gap-4 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© 2026 Luxury Perfumes. All rights reserved.</p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-end">
        <NavLink to="/privacy" className="transition hover:text-amber-400">
            Privacy Policy
        </NavLink>

        <span className="text-gray-700">|</span>

        <NavLink to="/terms" className="transition hover:text-amber-400">
            Terms of Service
        </NavLink>
        </div>
    </div>
    </div>
</footer>
);
}
