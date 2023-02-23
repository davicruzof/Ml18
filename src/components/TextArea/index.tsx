import { TextField } from "@mui/material";

import * as S from "./styles";

const TextArea = (props: any) => {
  return (
    <S.Container>
      <label style={{ color: "black" }}>{props.label}</label>
      <textarea
        autoComplete="none"
        style={{
          borderRadius: 4,
          borderColor: "black",
          borderWidth: 1,
          background: "transparent",
          width: "100%",
          minHeight: 48,
          paddingLeft: 15,
          color: "black",
        }}
        {...props}
      />
    </S.Container>
  );
};

export default TextArea;
