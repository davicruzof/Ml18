import * as S from "./styles";
import { ChatCardProps } from "./types";

export function CardChat({ title, message, date, hour }: ChatCardProps) {
  return (
    <S.Container isSender={!title}>
      {title && <S.Title>{title}</S.Title>}
      <S.Message>{message}</S.Message>
      <S.DateTime>
        {date} {hour && `às ${hour}`}
      </S.DateTime>
    </S.Container>
  );
}
