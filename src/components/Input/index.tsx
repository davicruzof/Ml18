import { TextField } from "@mui/material";

import * as S from "./styles";

const Input = (props: any) => {
  return (
    <S.Container>
      <TextField
        margin="none"
        fullWidth
        autoComplete="none"
        style={{
          borderRadius: 12,
        }}
        {...props}
      />
    </S.Container>
  );
};

export default Input;
