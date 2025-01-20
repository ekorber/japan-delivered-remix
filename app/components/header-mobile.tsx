import { Link } from "@remix-run/react";
import { useState } from "react";
import CartIcon from "./icons/cart-icon";
import HamburgerIcon from "./icons/hamburger-icon";

export default function MobileMobile() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

    const toggleMenu = () => setMenuOpen(!isMenuOpen)

    return (
        <header>
            <div className="flex items-center justify-between px-4 py-3">
                {/* Hamburger Menu */}
                <HamburgerIcon isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

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