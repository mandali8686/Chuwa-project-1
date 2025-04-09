import React, { useState } from "react";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    setPreview(form.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // optional: add validation here
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          image: form.image,
        }),
      });
      const result = await response.json();
      alert("Product created successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product name" onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
        />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          placeholder="In Stock Quantity"
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Add Image Link"
          onChange={handleChange}
        />
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
        {preview && (
          <img src={preview} alt="Preview" style={{ width: "150px" }} />
        )}
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
