import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useCartContext } from "~/contexts/CartContext";
import { prisma } from "~/db.server";

// Define the type of data being returned from the loader
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    rating: number;
    numRatings: number;
}

export const loader: LoaderFunction = async ({ params }) => {
    const product = await prisma.product.findUnique({where: { id: params.productId }});
    
    if (!product) {
        // Throw 404 error if product is not found
        throw new Response('Product Not Found', { status: 404 });
    }
    
    return json({product});
};

export default function Product() {
    const { product } = useLoaderData<{ product: Product }>();
    const { addToCart } = useCartContext();

    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.description}</p>
            <select className="numberDropdown" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <button onClick={() => addToCart(product.id, quantity)}>Add to Cart</button>
        </div>
    );
}