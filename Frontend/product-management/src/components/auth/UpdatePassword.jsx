import { Form, Input, Button, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/user/index";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);

  const onFinish = async ({ password }) => {
    try {
      const result = await dispatch(updatePassword({ userId: user._id, newPassword: password }));
      if (updatePassword.fulfilled.match(result)) {
        message.success("Password updated successfully");
        navigate('/');
      } else {
        message.error(result.payload || "Update failed");
      }
    } catch (err) {
      message.error("Unexpected error");
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: "10%" }}>
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
  );
};

export default UpdatePassword;
