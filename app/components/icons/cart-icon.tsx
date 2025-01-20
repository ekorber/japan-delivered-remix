import { Link } from "@remix-run/react";
import { useCartContext } from "~/contexts/CartContext";

export default function CartIcon() {
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
        <Link to={"/cart"} className="">
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-800"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l3 9h9l3-9h2M16 17a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0zm1-6h6"
                    />
                </svg>
                <div className="px-1 -ml-2 -mt-5 text-sm text-white bg-red-600 rounded">{totalItems > 0 && totalItems}</div>
            </div>
        </Link>
    )
}