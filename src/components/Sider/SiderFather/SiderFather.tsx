import * as React from "react";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import * as S from "./styles";
import { SiderItemProps } from "./types";

export default function SiderFather({ item, children }: SiderItemProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        borderColor: open ? "#435BC2" : "#94A0AE",
        borderWidth: 1,
        borderStyle: "solid",
        m: 2,
        mt: 0,
        p: 0,
        borderRadius: 1.5,
      }}
    >
      <S.ListItem onClick={handleClick} isOpen={open}>
        <S.TextItem isOpen={open} primary={item} />
        {open ? (
          <ExpandLess sx={{ color: "#435BC2" }} />
        ) : (
          <ExpandMore sx={{ color: "#94A0AE" }} />
        )}
      </S.ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  );
}
