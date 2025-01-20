import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import CartListItem from "~/components/cart-item";
import { useCartContext } from "~/contexts/CartContext";

interface ProductData {
    id: string
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity } = useCartContext();
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load product data on page load
    useEffect(() => {

        if (!cartItems || cartItems.length === 0)
            return
        
        // Define a function to fetch data from the server
        const fetchProducts = async () => {
            try {
                let ids = ''
                cartItems.map(item => ids = ids + item.id + ',')
                ids = ids.slice(0, -1); // Remove the last unnecessary comma

                const response = await fetch('/api/get-products?ids=' + ids);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                
                console.log(data)   // for testing
                setProducts(data); // Set the products to state
            } catch (err: any) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete
            }
        };
  
        // Call the fetch function
        fetchProducts();
    }, [])

    const removeCartItem = (id: string) => {
        setProducts((prevItems) => prevItems.filter((item) => item.id !== id));
        removeFromCart(id);
    }

    const calculateSubTotal = () => {
        let subTotal = 0;
        cartItems.forEach(item => {
            let pricePerUnit = 0;
            
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === item.id) {
                    pricePerUnit = products[i].price
                    break
                }
            }
            
            subTotal += (item.quantity * pricePerUnit)
        });

        return subTotal.toFixed(2);
    }

    if (cartItems && cartItems.length > 0 && loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (cartItems.length === 0)
        return (
            <>
                <h1>Cart</h1>
                <p>Your cart is currently empty. Feel free to browse around!</p>
            </>
        )

    return (
        <>
            <h1>Cart</h1>
            {products.map((p, i) => {
                return <CartListItem key={p.id} id={p.id} quantity={cartItems[i].quantity} name={p.name} price={p.price} description={p.description} imageUrl={p.imageUrl} updateQuantity={updateQuantity} removeFromCart={() => removeCartItem(p.id)} />
            })}

            <p>Subtotal: ${calculateSubTotal()}</p>
            <Link to={'/checkout'}>Checkout</Link>
        </>
    );
}