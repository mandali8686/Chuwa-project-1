import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CardContainer } from "../common/QuantityControl";
import { MailOutlined } from "@ant-design/icons";
import { CloseButton } from "../common/QuantityControl";
import styled from '@emotion/styled';

const IconWrapper = styled.div`
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 20px;
`;

const EmailSent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin')
  };

  return (
    <CardContainer>
    <Card style={{ width: '50%', margin: "0 auto", marginTop: "10%", textAlign:'center' }} onClick={handleClick}>
    <CloseButton onClick={handleClick} />
        <IconWrapper>
          <MailOutlined />
        </IconWrapper>
      <h2>We have sent the update password link to your email. Please check that!</h2>
      
    </Card>
    </CardContainer>
  );
};

export default EmailSent;
