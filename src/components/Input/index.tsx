import * as S from "./styles";

const Input = (props: any) => {
  return (
    <S.Container>
      <label style={{ color: "black" }}>{props.label}</label>
      <input
        autoComplete="off"
        style={{
          borderRadius: 4,
          borderColor: "black",
          borderWidth: 1,
          background: "transparent",
          width: "100%",
          height: 48,
          paddingLeft: 15,
          color: "black",
        }}
        {...props}
      />
    </S.Container>
  );
};

export default Input;
