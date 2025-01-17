import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
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

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
        </div>
    );
}