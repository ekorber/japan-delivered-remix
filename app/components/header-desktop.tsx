import { Link } from "@remix-run/react";

export default function HeaderDesktop({ totalCartItems } : { totalCartItems: number }) {
    return (
        <header>
            <Link to={"/"}>Japan Delivered</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/cart"}>Cart {totalCartItems > 0 && totalCartItems}</Link>
        </header>
    )
}