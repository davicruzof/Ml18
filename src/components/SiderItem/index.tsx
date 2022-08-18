import { ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SiderItensProps } from "./types";

export default function SiderItem({ itens, modulo }: SiderItensProps) {
  const navigate = useNavigate();

  const handleClick = (item: string) => {
    navigate(`/${modulo}/${item}`, { replace: true });
  };

  const keys = itens && Object.keys(itens);

  return (
    <>
      {keys &&
        keys.map((item) => (
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleClick(itens[item])}
            key={item}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
    </>
  );
}
