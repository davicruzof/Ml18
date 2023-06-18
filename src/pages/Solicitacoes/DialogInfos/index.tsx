import DialogComponent from "components/Dialog";
import * as S from "./styles";
import { returnTime } from "utils/format";

export function DialogInfos({ setOpenDialog, openDialog, request }: any) {
  return (
    <DialogComponent
      buttonConfirmText="Fechar"
      disableClose={true}
      setOpen={setOpenDialog}
      open={openDialog}
      handleButtonConfirm={() => setOpenDialog(!openDialog)}
      title="Detalhes da Solicitação"
    >
      <S.Container>
        <S.Info>
          Solicitante: <S.BoldText>{request.nome}</S.BoldText>
        </S.Info>
        <S.Info>
          Departamento: <S.BoldText>{request.area}</S.BoldText>
        </S.Info>
        <S.Info>
          Justificativa: <S.BoldText>{request.justificativa}</S.BoldText>
        </S.Info>
        <S.Info>Atualizado há {returnTime(request?.atualizado_a)}</S.Info>
      </S.Container>
    </DialogComponent>
  );
}
