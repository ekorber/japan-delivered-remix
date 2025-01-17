interface CartItemProps {
    id: string
    quantity: number
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    updateQuantity: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
}

export default function CartListItem({ id, quantity, name, price, description, imageUrl, updateQuantity, removeFromCart } : CartItemProps) {
    return (
        <div>
            <p>{name} : {quantity}</p>
        </div>
    );
}