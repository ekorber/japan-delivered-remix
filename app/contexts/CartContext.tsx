import { createContext, useContext, useEffect, useState } from "react";


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

const CART_LOCAL_STORAGE_KEY = 'cart'

export function CartProvider({children} : ChildProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Set the cart to the stored value just once, upon starting the app
        const storage = localStorage.getItem(CART_LOCAL_STORAGE_KEY)
        if (storage) {
            setCartItems(JSON.parse(storage))
        }
    }, [])

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

        const newCartItems = [...cartItems, {id, quantity}]
        // Only when adding new items to the cart
        setCartItems(newCartItems);
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartItems));
    }

    const removeFromCart = (id: string) => {
        const newCartItems = cartItems.filter((item) => item.id !== id)
        setCartItems(newCartItems);
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartItems));
    }

    const updateQuantity = (id: string, quantity: number) => {
        const newCartItems = cartItems.map(item => {
            if (item.id === id) {
                item.quantity = quantity;
            }
            return item;
        })

        setCartItems(newCartItems);
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartItems));
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