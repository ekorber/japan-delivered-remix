export default function Product() {

    const testProduct = {
        id: 3,
        productName: "Pokemonsss",
        price: 19.99,
        imgUrl: "https://m.media-amazon.com/images/I/61MVcnn+3oL._AC_UL320_.jpg"
    }

    return (
        <div>
            <img src={testProduct.imgUrl} alt={testProduct.productName} />
            <h2>{testProduct.productName}</h2>
            <p>${testProduct.price.toFixed(2)}</p>
        </div>
    );
}