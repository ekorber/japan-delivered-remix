import { createContext, useContext, useState } from "react";


interface CartItem {
    id: string;
    quantity: number;
}

interface Cart {
    cartItems: CartItem[]
    addToCart: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

interface ChildProps {
    children: React.ReactNode; // Accepts any valid React node
}

const CartContext = createContext<Cart | undefined>(undefined);

export function CartProvider({children} : ChildProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (id: string, quantity: number) => {
        let alreadyInCart = false;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
                updateQuantity(id, cartItems[i].quantity + quantity);
                alreadyInCart = true;
                break;
            }
        };

        if (alreadyInCart)
            return;

        // Only when adding new items to the cart
        setCartItems((prevItems) => [...prevItems, {id, quantity}]);
    }

    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                item.quantity = quantity;
            }
            return item;
        }));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext(): Cart {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}