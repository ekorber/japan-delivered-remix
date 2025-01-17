import { Link } from "@remix-run/react";
import { useCartContext } from "~/contexts/CartContext";

export default function Header() {
    const { cartItems } = useCartContext();

    const calculateTotalItems = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.quantity
        });

        return total
    }

    const totalItems = calculateTotalItems();

    return (
        <div>
            <Link to={"/"}>Japan Delivered</Link>
            <p> </p>
            <Link to={"/products"}>Products</Link>
            <p> </p>
            <Link to={"/cart"}>Cart {totalItems > 0 && totalItems}</Link>
            <p> </p>
        </div>
    );
}