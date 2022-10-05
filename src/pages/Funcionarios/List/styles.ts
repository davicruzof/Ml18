import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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
