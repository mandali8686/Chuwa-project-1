import { Form, Input, Button, message, Card } from "antd";
import { useDispatch } from "react-redux";
import { sendResetEmail } from "../../features/user/index"; 
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';


const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
const CardContainer = styled(Card)`
  height: 100vh;
  background: rgba(190, 185, 185, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
`;

  const onFinish = async ({ email }) => {
    try {
      const result = await dispatch(sendResetEmail(email));
      if (sendResetEmail.fulfilled.match(result)) {
        message.success("Recovery email sent!");
        navigate('/email-sent');
      } else {
        message.error(result.payload || "Failed to send email");
      }
      // message.success("Recovery email sent!");
      // navigate('/signin');
    } catch (err) {
      message.error("Unexpected error");
    }
  };

  return (
    <CardContainer>
    <Card style={{ maxWidth: '100%', margin: "0 auto", marginTop: "10%", textAlign:'center' }}>
      <h2>Update Your Password</h2>
      <p>Enter your email, we will send you the recovery link.</p>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send Recovery Email
          </Button>
        </Form.Item>
        <ResponsiveFooter>
                <p style={{ marginRight: '0.5rem' }}>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </p>
          </ResponsiveFooter>
      </Form>
    </Card>
    </CardContainer>
  );
};

export default ForgetPassword;
