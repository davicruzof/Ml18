import styled from "styled-components";
import theme from "utils/theme";

export const Container = styled.div`
  height: fit-content;
  min-height: 100vh;
  margin-top: 32px;
`;

export const Logo = styled.img`
  margin-right: 20px;
  background-color: ${theme.colors.primary};
  height: 100px
  width: 100px;
  padding: 1px;
  object-fit: cover;
  border-radius: 5%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);
`;
