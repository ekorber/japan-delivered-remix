import { Link } from "@remix-run/react";

export default function Header() {
    return (
        <div>
            <Link to={"/"}>Japan Delivered</Link>
            <Link to={"/cart"}>Cart</Link>
        </div>
    );
}