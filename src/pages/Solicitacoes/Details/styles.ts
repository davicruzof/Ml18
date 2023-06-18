import { Accordion, AccordionSummary } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled(Accordion)`
  position: fixed;
  background: ${(props) => props.theme.colors.bgSider}!important;
`;

export const HeaderTitle = styled(AccordionSummary)`
  color: #000;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  padding-bottom: 0px;
`;

export const WrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Info = styled.span`
  color: #fff;
  font-size: 14px;
`;

export const BoldText = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.input`
  border: 2px solid #767d85;
  padding: 8px;
  padding-left: 16px;
  border-radius: 8px;
  width: 78%;
  font-size: 16px;
  background-color: #fff;
`;
