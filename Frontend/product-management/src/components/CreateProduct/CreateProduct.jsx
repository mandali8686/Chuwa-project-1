import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message, Typography, Card } from "antd";
import "./CreateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../features/product/productReducer";

const { Title } = Typography;

const CreateProduct = () => {
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const [form] = Form.useForm();

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
      const resultAction = await dispatch(createNewProduct(values));
  
      if (createNewProduct.fulfilled.match(resultAction)) {
        message.success("Product created successfully!");
        form.resetFields();
        setPreview("");
      } else {
        message.error(resultAction.payload || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    }
  };
  
  return (
    <div className="create-product-container" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card>
        <Title level={3}>Create Product</Title>

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
              Add Product
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
