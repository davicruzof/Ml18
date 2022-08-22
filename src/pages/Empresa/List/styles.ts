import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    justify-content: center;
    padding-top: ${(props) => props.theme.spacing.xxlarge}px;
    align-items: center;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 5%;
    margin-left: 0%;
  }
`;
