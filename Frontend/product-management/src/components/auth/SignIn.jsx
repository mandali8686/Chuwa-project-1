import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/user/index'
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

const SignIn = () => {
  const [error, setError] = useState('');
  const { cur_user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cur_user) {
      navigate('/products');  // Redirect to products page if user is logged in
    }
  }, [cur_user, navigate]);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      await dispatch(loginUser({ email, password }));
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Card>
      <AuthContainer>
        <Title level={3}>Sign In to Your Account</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <StyledForm name="signin" layout="vertical" onFinish={onFinish}>
        <Form
          name="signin"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ email: '', password: '' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        </StyledForm>
      </AuthContainer>
      <div style={{ textAlign: 'center' }}>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </Card>
  );
};

export default SignIn;
