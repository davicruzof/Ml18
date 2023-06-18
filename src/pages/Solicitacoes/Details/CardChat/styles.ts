import styled from "styled-components";

export const Container = styled.div<{ isSender: boolean }>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fdfdfd;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 70%;
  ${(props: any) => props.isSender && "margin-left: 30%"}
`;

export const Title = styled.span`
  color: ${(props: any) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Message = styled.span`
  color: #192333;
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const DateTime = styled.span`
  color: #9e9e9e;
  font-size: 14px;
  width: 100%;
  text-align: right;
`;
