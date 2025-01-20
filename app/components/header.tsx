import { useEffect, useState } from "react";
import HeaderDesktop from "./header-desktop";
import HeaderMobile from "./header-mobile";

export default function Header() {
    const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)

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

    return (
        isMobileScreen ? <HeaderMobile /> : <HeaderDesktop />
    );
}