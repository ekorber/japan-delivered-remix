interface CartItemProps {
    id: string
    quantity: number
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    updateQuantity: (id: string, quantity: number) => void
    removeFromCart: () => void
}

export default function CartListItem({ id, quantity, name, price, description, imageUrl, updateQuantity, removeFromCart } : CartItemProps) {
    return (
        <div>
            <p>{name} : {quantity}</p>
            <button onClick={() => removeFromCart()}>Remove From Cart</button>
        </div>
    );
}