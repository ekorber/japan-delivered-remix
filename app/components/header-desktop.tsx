import { Link } from "@remix-run/react";
import CartIcon from "./icons/cart-icon";

export default function HeaderDesktop() {
    return (
        <header className="flex items-center justify-between px-4 py-4">
            <div className="space-x-2">
                <Link to={"/"} className="py-2 px-4 text-lg font-bold">Japan Delivered</Link>
                <Link to={"/"} className="py-2 px-4 hover:bg-red-600 hover:text-white rounded">Home</Link>
                <Link to={"/products"} className="py-2 px-4 hover:bg-red-600 hover:text-white rounded">Products</Link>
            </div>
            <CartIcon />
        </header>
    )
}