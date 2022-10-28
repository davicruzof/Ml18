import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 32px;
  padding-top: ${(props) => props.theme.spacing.xlarge}px;
`;
