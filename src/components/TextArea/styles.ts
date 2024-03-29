import styled from "styled-components";

export const Container = styled.div`
  width: ${(props) => props.theme.spacing.full}%;
  margin-bottom: ${(props) => props.theme.spacing.xsmall}px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
