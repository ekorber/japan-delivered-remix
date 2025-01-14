interface ProductCardProps {
    productName: string;
    price: number;
    imageUrl: string;
    handleClick: () => void;
}

export default function ProductCard({productName, price, imageUrl, handleClick} : ProductCardProps) {
    return (
        <div onClick={handleClick}>
            <img src={imageUrl} alt={productName} />
            <h3>{productName}</h3>
            <p>${price.toFixed(2)}</p>
        </div>
    );
}