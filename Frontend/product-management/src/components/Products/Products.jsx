// Read from DB a list of products
// display on this page
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";

function Products(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getAllProducts().then(
            (data)=>{
                console.log("Data: ",data);
                setProducts(data);
            }).catch((error=>{
                console.error("Fail to Fetch product data. ", error);
            }))
    }, []);

    return(
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product)=>(
                    <li key={product._id}>
                        <strong>{product.name}</strong> - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Products;