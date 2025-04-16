import { Form, Input, Button, message, Card } from "antd";
import { useDispatch } from "react-redux";
// import { sendResetEmail } from "../../features/user/index"; 
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async ({ email }) => {
    try {
    //   const result = await dispatch(sendResetEmail(email));
    //   if (sendResetEmail.fulfilled.match(result)) {
    //     message.success("Recovery email sent!");
    //     navigate('/login');
    //   } else {
    //     message.error(result.payload || "Failed to send email");
    //   }
    message.success("Recovery email sent!");
    navigate('/signin');
    } catch (err) {
      message.error("Unexpected error");
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: "10%", textAlign:'center' }}>
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
      </Form>
    </Card>
  );
};

export default ForgetPassword;
