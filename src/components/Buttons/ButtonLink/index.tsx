// @ts-nocheck
import React from 'react';

import * as S from './styles';

interface ButtonProps {
  title: string;
  focus?: boolean;
}

const ButtonLink: React.FC<ButtonProps> = ({title, ...props}) => {
  return (
    <S.Container>
      <S.TextButton {...props}>{title}</S.TextButton>
    </S.Container>
  );
};

export default ButtonLink;
