import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Typography, Card } from "antd"; // Added Card import
import styled from "@emotion/styled";
import { createUserAsync } from '../../features/user/index'

export default function Signup() {
  // const [error, setError] = useState("");
  const {  loading, error } = useSelector((state) => state.user);
  console.log(error)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Title } = Typography;

  const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    max-width: 400px;
    margin: 0 auto;
  `;

  const StyledForm = styled(Form)`
    width: 300px;
    .ant-form-item-label {
      color: #333;
    }
  `;

  const onFinish = async (values) => {
    try {
      let res = await dispatch(createUserAsync(values));
      //navigate('/')
    } catch (e) {
      console.log("error catche: ", e)
    }
  };

  // useEffect(() => {
  //   if (cur_user) {
  //     navigate("/");
  //   }
  // }, [cur_user, navigate]);

  return (
    <Card>
      <AuthContainer>
        <Title>Sign Up</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <StyledForm name="signup" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Account
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
        </StyledForm>
      </AuthContainer>
    </Card>
  );
}
