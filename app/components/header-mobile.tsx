import { Link } from "@remix-run/react";
import { useState } from "react";
import CartIcon from "./icons/cart-icon";

export default function MobileMobile() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

    const toggleMenu = () => setMenuOpen(!isMenuOpen)

    return (
        <header>
            <div className="flex items-center justify-between px-4 py-3">
                {/* Hamburger Menu */}
                <button onClick={toggleMenu} className="focus:outline-none" aria-label="Mobile Header toggle menu">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                {/* Logo */}
                <Link to="/" className="text-lg font-bold">Japan Delivered</Link>
                
                {/* Cart */}
                <CartIcon />
            </div>
            
            <nav className={`${isMenuOpen ? "block" : "hidden"} transition-all`}>
                <ul className="space-y-2 px-4 py-2">
                    <li>
                        <Link to={"/"} className="block py-2 px-4 hover:bg-red-600 hover:text-white rounded">Home</Link>
                    </li>
                    <li>
                        <Link to={"/products"} className="block py-2 px-4 hover:bg-red-600 hover:text-white rounded">Products</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}