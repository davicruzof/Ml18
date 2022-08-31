import * as S from "./styles";

import { Itens } from "./util";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

export default function Sider() {
  const { setAuthValues } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setAuthValues(null);
    navigate("/Login", { replace: true });
    window.location.reload();
  };

  const handleClick = (route: string) => {
    navigate(`/${route}/List`, { replace: true });
  };

  return (
    <S.Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <img
          height={100}
          width={100}
          src="https://www.bing.com/th?id=Aad21b7b10461ff482b0a74753c2348f2&w=80&h=80&c=7&o=6&dpr=1.5&pid=SANGAM"
        />
      </div>

      {Itens.map((item, index) => (
        <Button
          key={index}
          sx={{ m: 2, mt: 1, border: "1px solid #435BC2" }}
          variant="text"
          onClick={() => handleClick(item)}
        >
          {item}
        </Button>
      ))}
      <Button variant="outlined" color="error" sx={{ m: 2 }} onClick={logout}>
        Sair
        <Logout sx={{ pl: 1, fontSize: "1rem" }} />
      </Button>
    </S.Container>
  );
}
