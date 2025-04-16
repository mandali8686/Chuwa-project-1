
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message, Typography, Card } from "antd";
import "./CreateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct, updateProductById } from "../../features/product/productReducer";
import { useNavigate } from "react-router-dom";
import {fetchCart} from '../../features/cart'

const { Title } = Typography;

const CreateProduct = () => {
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);
  const navigate = useNavigate();
  const currentProduct = useSelector(state => state.product.currentProduct);
  const isEditMode = !!currentProduct;
  const [form] = Form.useForm();


  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/error");
    }
    if (isEditMode) {
      form.setFieldsValue({
        name: currentProduct.name,
        description: currentProduct.description,
        category: currentProduct.category,
        price: currentProduct.price,
        stock: currentProduct.stock,
        imageUrl: currentProduct.image || currentProduct.imageUrl
      });
      setPreview(currentProduct.image || currentProduct.imageUrl);
    }
  }, [user, navigate, currentProduct, isEditMode, form]);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handlePreview = () => {
    const imageUrl = form.getFieldValue("image");
    if (imageUrl) {
      setPreview(imageUrl);
    } else {
      message.warning("Please enter an image URL first.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      let resultAction;
      if (isEditMode) {
        resultAction = await dispatch(updateProductById({ productId: currentProduct.id, updatedData: values }));
      } else {
        resultAction = await dispatch(createNewProduct(values));
      }

      if ((isEditMode ? updateProductById.fulfilled : createNewProduct.fulfilled).match(resultAction)) {
        message.success(isEditMode ? "Product updated successfully!" : "Product created successfully!");
        form.resetFields();
        setPreview("");
        if (user) {
          dispatch(fetchCart(user._id));  // Dispatch after the update is successful
        }
      } else {
        message.error(resultAction.payload || "Failed to save product");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    }
  };


  return (

    <div className="create-product-container" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card>
      <Title level={3}>{isEditMode ? 'Edit Product' : 'Create Product'}</Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Product Description"
            rules={[{ required: true, message: "Please enter product description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter a category" }]}
          >
            <Input placeholder="e.g. electronics, clothing..." />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber prefix="$" min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="In Stock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="https://example.com/image.png" />
          </Form.Item>

          <Form.Item>
            <Button type="default" onClick={handlePreview} style={{ marginRight: 10 }}>
              Preview Image
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Update Product' : 'Add Product'}
            </Button>
          </Form.Item>

          {preview && (
            <Form.Item label="Image Preview">
              <img src={preview} alt="Preview" style={{ width: 150 }} />
            </Form.Item>
          )}
        </Form>
      </Card>

    </div>
  );
};

export default CreateProduct;
