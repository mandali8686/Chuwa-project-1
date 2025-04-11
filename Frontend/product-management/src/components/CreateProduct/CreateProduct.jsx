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

    try {
      const response = await fetch("http://localhost:5400/api/products", {
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

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      alert("Product created successfully!");
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });
      setPreview("");
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          placeholder="In Stock Quantity"
          value={form.stock}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Add Image Link"
          value={form.image}
          onChange={handleChange}
        />
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
        {preview && (
          <div style={{ marginTop: "10px" }}>
            <img src={preview} alt="Preview" style={{ width: "150px" }} />
          </div>
        )}
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
