import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { DptTypes } from "@services/Solicitacoes/types";

const customList = (
  items: DptTypes[],
  handleToggle: (val: string) => void,
  checked: string[]
) => (
  <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
    <List dense component="div" role="list">
      {items.map((value: DptTypes) => {
        const labelId = `transfer-list-item-${value.area}-label`;

        return (
          <ListItem
            key={value.id_area}
            role="listitem"
            button={true}
            onClick={() => handleToggle(value.area)}
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
  </Paper>
);

export default customList;
