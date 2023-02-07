import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { DptTypes } from "services/Solicitacoes/types";
import * as S from "./style";

export default function listItems(
  items: DptTypes[],
  checked: string[],
  title: string,
  handleToggle: (value: string) => () => void
) {
  return (
    <>
      {items.length > 0 && <S.Title>{title}</S.Title>}
      <List dense role="list">
        {items.map((value: DptTypes) => {
          const labelId = `transfer-list-item-${value.area}-label`;

          return (
            <ListItem
              key={value.id_area}
              role="listitem"
              button
              onClick={handleToggle(value.area)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value.area) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.area}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </>
  );
}
