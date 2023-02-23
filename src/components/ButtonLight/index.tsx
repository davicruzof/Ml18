import React from "react";
import { ButtonProp } from "./type";
import * as S from "./styles";

const ButtonLight: React.FC<ButtonProp> = ({
  title,
  active,
  onClick,
  disabled,
  loading,
}) => {
  return (
    <S.ButtonCustom
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      isActive={active}
    >
      {title}
    </S.ButtonCustom>
  );
};

export default ButtonLight;
