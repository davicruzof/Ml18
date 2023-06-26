import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Delete, Edit, Group, Person } from "@mui/icons-material";
import { videoType } from "../../services/Telemetria/type";

export function CardVideo({ props }: { props: videoType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: 235,
        padding: 2,
        height: 340,
        borderRadius: 1,
        backgroundColor: "#fff",
        boxShadow: "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
      }}
    >
      <video
        controls
        src={props.link}
        style={{
          width: 200,
          height: 200,
          objectFit: "cover",
          borderRadius: 4,
          border: "none",
        }}
      />

      <Typography
        variant="body1"
        fontWeight={600}
        gutterBottom
        color="text.primary"
        textOverflow="ellipsis"
        noWrap
      >
        {props.titulo}
      </Typography>
      <Typography
        marginBottom={2}
        variant="subtitle2"
        color="text.primary"
        textOverflow="ellipsis"
        noWrap
      >
        {props.descricao}
      </Typography>

      <Button
        onClick={handleClick}
        fullWidth
        variant="contained"
        endIcon={<SettingsIcon />}
      >
        Opções
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Enviar por funcionário</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Group fontSize="small" />
          </ListItemIcon>
          <ListItemText>Enviar por função</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
