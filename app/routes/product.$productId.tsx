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
    const { cartItems, addToCart } = useCartContext();

    const [quantity, setQuantity] = useState(1);

    const getStockMessage = () => {
        if (product.stock == 0) {
            return 'Out Of Stock'
        }

        if (product.stock < 10) {
            return 'Less than 10 remaining!'
        }

        return 'In Stock'
    }

    const getMaxAvailableQuantity = () => {
        let quantityInCart = 0

        cartItems.map(item => {
            if (item.id === product.id) {
                quantityInCart += item.quantity
            }
        })

        let maxItemsAvailableForUser = Math.min(product.stock, 10)

        return Math.min(maxItemsAvailableForUser - quantityInCart, 10)
    }
    
    const getCurrentQuantityInCart = () => {
        let quantityInCart = 0

        cartItems.map(item => {
            if (item.id === product.id) {
                quantityInCart += item.quantity
            }
        })

        return quantityInCart
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Product Image Gallery */}
                <div className="flex justify-center">
                    <img src={product.imageUrl} alt={product.name} className="w-full max-w-md object-cover"/>
                </div>

                {/* Product Details */}
                <div>
                    {/* Product Title and Description */}
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-lg text-gray-600 mb-6">{product.description}</p>

                    {/* Price */}
                    <p className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                    
                    <p className="mb-2">{getStockMessage()}</p>

                    {
                        product.stock > 0 && <>

                            {getCurrentQuantityInCart() == 10 ?
                                <p>Cannot add any more of this item to your cart.</p>
                                :
                                <>
                                    <select className="mr-2 py-2 rounded-lg" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
                                        {Array.from({ length: getMaxAvailableQuantity() }, (_, i) => i + 1).map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>

                                    <button onClick={() => addToCart(product.id, quantity)}
                                        className="bg-black text-white py-2 px-6 rounded-lg transition duration-300 hover:bg-gray-500">
                                        Add to Cart
                                    </button>
                                </>}
                            
                            
                        </>
                    }
                    
                </div>

            </div>
            
        </div>
    );
}