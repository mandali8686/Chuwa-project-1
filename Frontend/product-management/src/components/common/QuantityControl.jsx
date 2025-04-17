import styled from '@emotion/styled';
import { Card } from 'antd';
import { CloseOutlined } from "@ant-design/icons";

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-radius: 6px;
  padding: 4px 8px;
`;

export const QtyButton = styled.button`
  background-color: #6200ee;
  color: white;
  border: none;
  padding: 6px 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Quantity = styled.span`
  margin: 0 10px;
  font-weight: 600;
`;


export const CardContainer = styled(Card)`
  height: 100vh;
  background: rgba(190, 185, 185, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
`;

export const CloseButton = styled(CloseOutlined)`
position: absolute;
top: 16px;
right: 16px;
font-size: 20px;
color: #999;
cursor: pointer;
&:hover {
  color: #333;
}
`;