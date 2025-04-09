// Read from DB a list of products
// display on this page
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import ProductItem from './ProductItem';
import './Products.css'
import NavBar from '../NavBar/NavBar';

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

    return (
        <div className="products-page">
            <NavBar />
          <div className="products-header">
            <h1>Products</h1>
            <div className="products-controls">
              <select>
                <option>Last added</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
              <button className="add-btn">Add Product</button>
            </div>
          </div>
    
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductItem
                key={index}
                image={product.image || 'https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png'}
                name={product.name}
                price={product.price}
                description = {product.description}
                category={product.category || 'Category Placeholder'}
                outOfStock ={product.outOfStock}
              />
            ))}
          </div>
    
          <div className="pagination">
            <button disabled>«</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button key={page} className={page === 1 ? "active" : ""}>
                {page}
              </button>
            ))}
            <button>»</button>
          </div>
        </div>
      );
}

export default Products;