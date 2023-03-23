import styled from "styled-components";
import theme from "utils/theme";

export const Container = styled.div`
  padding: 30px 40px;
  height: fit-content;
  min-height: 100vh;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const Logo = styled.img`
  margin-right: 20px;
  background-color: ${theme.colors.primary};
  height: 50px
  width: 50px;
  padding: 1px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);
`;

export const colorPreview = styled.div<{ cor: string }>`
  background-color: ${({ cor }) => (cor ? `#${cor}` : "#fff")};
  height: 52px
  width: 80px
  border-radius: 4px
  border: 1px solid ${theme.colors.text.disabled};
  margin-left: 14px;
  margin-bottom: -14px;
`;
