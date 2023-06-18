import styled from "styled-components";

const sizeWidth = window.innerWidth - 250;

export const Container = styled.div`
  height: 100vh;
`;

export const Header = styled.div`
  height: 80px;
  position: fixed;
  width: ${sizeWidth}px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.bgSider};
`;

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 16px;
`;

export const TitleContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const WrapperMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 100px 20px;
  background: #f1f1f1f1;
`;

export const BoldText = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.input`
  border: 2px solid #767d85;
  padding: 8px;
  padding-left: 16px;
  border-radius: 8px;
  width: inherit;
  font-size: 16px;
  background-color: #fff;
`;

export const Footer = styled.div`
  position: fixed;
  height: 80px;
  width: ${sizeWidth}px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: #fff;
  gap: 8px;
  bottom: 0;
`;
