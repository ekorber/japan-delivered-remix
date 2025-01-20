interface HamburgerIconProps {
    isMenuOpen: boolean
    toggleMenu: () => void
}

export default function HamburgerIcon({ isMenuOpen, toggleMenu }: HamburgerIconProps) {
    return (
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
    )
}