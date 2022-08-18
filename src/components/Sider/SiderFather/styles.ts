import { ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import styled from "styled-components";

export const ListItem = styled(ListItemButton)<{ isOpen: boolean }>`
  ${(props) =>
    props.isOpen &&
    `
    box-shadow: 1px 2px 8px 0px rgb(0 0 0 / 5%);
`}
`;

export const TextItem = styled(ListItemText)<{ isOpen: boolean }>`
  color: ${(props) =>
    props.isOpen
      ? props.theme.colors.primary
      : props.theme.colors.text.siderItemDisabled};
  font-weight: bold !important;
`;
