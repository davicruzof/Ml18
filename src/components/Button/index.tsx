import React from "react";
import { ButtonProp } from "./type";
import * as S from "./styles";

const Button: React.FC<ButtonProp> = ({
  title,
  active,
  onClick,
  disabled,
  loading,
  children,
  ...props
}) => {
  return (
    <S.ButtonCustom
      {...props}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      isActive={active}
    >
      {title}
      {children}
    </S.ButtonCustom>
  );
};

export default Button;
