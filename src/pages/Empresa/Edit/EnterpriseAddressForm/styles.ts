import { FormGroup } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  height: fit-content;
  min-height: 100vh;
  margin-top: 32px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3px;
`;

export const Divider = styled(FormGroup)`
  margin-right: 20px;
`;
