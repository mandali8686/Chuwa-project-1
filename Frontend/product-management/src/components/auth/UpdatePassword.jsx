import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/user/index";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CardContainer } from "../common/QuantityControl";


const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(state => state.user.currentUser);
  const { token } = useParams();
  localStorage.setItem('token', token);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded?.user?.id) throw new Error("Invalid token");
      setUserId(decoded.user.id);
    } catch (e) {
      message.error("Invalid or expired link.");
      navigate("/");
    }
  }, [token, navigate]);

  const onFinish = async ({ password }) => {
    try {
      const result = await dispatch(updatePassword({ userId: userId, newPassword: password }));
      if (updatePassword.fulfilled.match(result)) {
        message.success("Password updated successfully");
        localStorage.removeItem('token'); //for new login
        navigate('/signin');
      } else {
        message.error(result.payload || "Update failed");
      }
    } catch (err) {
      message.error("Unexpected error");
    }
  };

  return (
    <CardContainer>
    <Card style={{ width: '100%', margin: "0 auto"}}>
      <h2>Update Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please input your new password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </CardContainer>
  );
};

export default UpdatePassword;
