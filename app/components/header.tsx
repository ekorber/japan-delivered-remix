import { useEffect, useState } from "react";
import { useCartContext } from "~/contexts/CartContext";
import HeaderDesktop from "./header-desktop";
import HeaderMobile from "./header-mobile";

export default function Header() {
    const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)
    const { cartItems } = useCartContext();

    useEffect(() => {
        const onScreenSizeChanged = () => {
            setIsMobileScreen(window.innerWidth <= 768)
        }

        // Run the function when the component mounts at start
        onScreenSizeChanged()

        window.addEventListener('resize', onScreenSizeChanged)

        // Remove event listener as cleanup when unmounting
        return () => window.removeEventListener('resize', onScreenSizeChanged)
    }, [])

    const calculateTotalItems = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.quantity
        });

        return total
    }

    const totalItems = calculateTotalItems();

    return (
        isMobileScreen ? <HeaderMobile totalCartItems={totalItems} /> : <HeaderDesktop totalCartItems={totalItems} />
    );
}