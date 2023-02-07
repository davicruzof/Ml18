import styled from "styled-components";
import { LoadingButton } from "@mui/lab";
import { typeButton } from "./type";

export const ButtonCustom = styled(LoadingButton).attrs({
  size: "large",
  variant: "contained",
  sx: {
    mt: 3,
  },
})<typeButton>`
  width: 100%;
  ${(props) => props.isActive && `background-color: #cacaca;`}
`;
