import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import GridList from "~/components/grid-list";
import ProductCard from "~/components/product-card";
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

export const loader: LoaderFunction = async () => {
    const products = await prisma.product.findMany();
    return { products };
};

export default function Products() {
    const navigate = useNavigate();
    const { products } = useLoaderData<{ products: Product[] }>();

    const openProductPage = (id: string) => {
        navigate('/product/' + id);
    }

    return (
        <div>
            <GridList>
                {products.map(product => {
                    return <ProductCard key={product.id} productName={product.name} price={product.price} imageUrl={product.imageUrl} handleClick={() => openProductPage(product.id)} />
                })}
            </GridList>        
        </div>
    );
}