import { Link } from "@remix-run/react";

export default function Header() {
    return (
        <div>
            <Link to={"/"}>Japan Delivered</Link>
            <p> </p>
            <Link to={"/products"}>Products</Link>
            <p> </p>
            <Link to={"/cart"}>Cart</Link>
            <p> </p>
        </div>
    );
}