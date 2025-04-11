import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Typography, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../features/user/index'

import styled from '@emotion/styled';

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

const CardContainer = styled(Card)`
  height: 100vh;
  background: rgba(190, 185, 185, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
`;

const ResponsiveFooter = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 960px) {
  flex-direction: column;
  }
`;

const SignIn = () => {
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onFinish = async (values) => {
    dispatch(clearError())
    const { email, password } = values;
    await dispatch(loginUser({ email, password }))
  };

  const handleFieldChange = () => {
    if (error) dispatch(clearError());
  };

  const StyledForm = styled(Form)`
  width: 300px;
  .ant-form-item-label {
    color: #333;
  }
`;

  return (
    <CardContainer>
      <AuthContainer>
        <Title level={3}>Sign In to Your Account</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <StyledForm name="signin" layout="vertical" onFinish={onFinish}>


          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input onChange={handleFieldChange} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={handleFieldChange} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
          <ResponsiveFooter>
                <p style={{ marginRight: '0.5rem' }}>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </p>
                <p>
                <a href="/signup">Forget Password?</a>
                </p>
          </ResponsiveFooter>
        </StyledForm>
      </AuthContainer>
    </CardContainer>
  );
};

export default SignIn;
