import styled from "styled-components";
import { typeButton } from "./type";

export const ButtonCustom = styled.button<typeButton>`
  width: auto;
  display: inline-flex;
  position: relative;
  text-decoration: none;
  font-size: 0.9375rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  margin-top: 24px;
  background-color: transparent;
  color: #000;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
  border: 0;
  ${(props) => props.isActive && `background-color: #cacaca;`}
`;
