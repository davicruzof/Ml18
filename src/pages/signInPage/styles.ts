import styled from "styled-components";
import { height, width } from "utils/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1000px) {
    justify-content: center;
    padding-top: ${(props) => props.theme.spacing.xxlarge}px;
    align-items: center;
  }
`;

export const Wrapper = styled.div`
  width: ${(props) => `${props.theme.spacing.xxlarge}%`};
  position: fixed;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const BG = styled.img`
  width: ${width}px;
  height: ${height}px;
  object-fit: cover;
  padding: ${(props) => props.theme.spacing.zero};
`;

export const Form = styled.div`
  width: ${(props) => `${props.theme.spacing.xxlarge}%`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: ${(props) => props.theme.spacing.xxlarge}px
    ${(props) => `${props.theme.spacing.xxsmall}%`};

  margin-left: 50%;

  @media (max-width: 1000px) {
    width: ${(props) => `${props.theme.spacing.full}%`};
    padding: ${(props) => props.theme.spacing.zero}px
      ${(props) => `${props.theme.spacing.xxxsmall}%`};
    margin-left: 0;
  }
`;

export const Logo = styled.img`
  height: 80px;
  object-fit: contain;
  width: ${(props) => `${props.theme.spacing.full}%`};
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xlarge}px;
`;
