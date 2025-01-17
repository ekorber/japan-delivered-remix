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
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        updateQuantity(id, value);
    };

    return (
        <div>
            <p>{name} - ${(price * quantity).toFixed(2)}</p>
            <div>
                <select className="numberDropdown" value={quantity} onChange={handleChange}>
                    <option value="" disabled>
                    -- Select a number --
                    </option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={() => removeFromCart()}>Remove From Cart</button>
        </div>
    );
}