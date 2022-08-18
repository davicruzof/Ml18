import styled from "styled-components";

export const Container = styled.div`
  width: ${(props) => props.theme.spacing.medium}%;
  height: ${(props) => props.theme.spacing.full}vh;
  background-color: ${(props) => props.theme.colors.bgSider};
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const AccordionContainer = styled.div`
  width: ${(props) => props.theme.spacing.full}%;
  display: flex;
  flex-direction: column;
`;
