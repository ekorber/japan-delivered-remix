import { useNavigate } from "@remix-run/react";
import GridList from "~/components/grid-list";
import ProductCard from "~/components/product-card";

export default function Products() {
    const navigate = useNavigate();

    const testProduct = {
        id: 3,
        name: "Pokemon Cards",
        price: 9.99,
        imgUrl: "https://m.media-amazon.com/images/I/61MVcnn+3oL._AC_UL320_.jpg"
    }

    const openProductPage = (id: number) => {
        navigate('/product/' + id);
    }

    return (
        <div>
            <GridList>
                <ProductCard productName={testProduct.name} price={testProduct.price} imageUrl={testProduct.imgUrl} handleClick={() => openProductPage(testProduct.id)} />
                <ProductCard productName={testProduct.name} price={testProduct.price} imageUrl={testProduct.imgUrl} handleClick={() => openProductPage(testProduct.id)} />
                <ProductCard productName={testProduct.name} price={testProduct.price} imageUrl={testProduct.imgUrl} handleClick={() => openProductPage(testProduct.id)} />
                <ProductCard productName={testProduct.name} price={testProduct.price} imageUrl={testProduct.imgUrl} handleClick={() => openProductPage(testProduct.id)} />
            </GridList>        
        </div>
    );
}