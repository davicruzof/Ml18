import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing.xlarge}px;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 5%;
    margin-left: 0%;
  }
`;
