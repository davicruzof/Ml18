import theme from "utils/theme";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px;
  height: 100vh;
  padding-top: 30px;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
`;

export const ButtonCustom = styled.label`
  width: auto;
  display: flex;
  justify-content: center;
  position: relative;
  text-decoration: none;
  font-size: 0.9375rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-top: 24px;
  background-color: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  border: 0;
`;
export const ButtonRemove = styled.label`
  width: auto;
  display: flex;
  justify-content: center;
  position: relative;
  text-decoration: none;
  font-size: 0.9375rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  border: 0;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  width: 50%;
  background: rgba(242, 245, 249, 1);
`;
