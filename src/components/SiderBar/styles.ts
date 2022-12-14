import styled from "styled-components";
import { Button } from "@mui/material";

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

export const ActionButton = styled.a<{ active: boolean }>`
  margin: ${(props) => props.theme.spacing.small}px;
  margin-top: ${(props) => props.theme.spacing.xsmall}px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  color: ${(props) => (props.active ? "#fff" : props.theme.colors.primary)};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
  }
`;
