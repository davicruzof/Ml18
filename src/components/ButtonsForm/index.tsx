import { Container } from "./styles";
import ButtonLight from "components/ButtonLight";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import { ButtonsFormProps } from "./types";
import { FormGroup } from "@mui/material";

export function ButtonsForm({
  rotaBack,
  handleButton,
  title,
}: ButtonsFormProps) {
  const navigate = useNavigate();
  return (
    <Container>
      <ButtonLight
        title="Voltar"
        onClick={() => navigate(rotaBack, { replace: true })}
      />
      <FormGroup sx={{ ml: 5 }} />
      <Button title={title} onClick={handleButton} />
    </Container>
  );
}
