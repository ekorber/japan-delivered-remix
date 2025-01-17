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

    const maxDescriptionLength = 20;

    return (
        <div>
            <img src={imageUrl} />
            <p>{name} - {description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength).trim() + '...' : description}</p>
            <select className="numberDropdown" value={quantity} onChange={handleChange}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <p>${(price * quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart()}>Remove From Cart</button>
        </div>
    );
}