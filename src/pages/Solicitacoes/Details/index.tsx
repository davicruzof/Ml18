import { useEffect, useRef, useState } from "react";

import * as S from "./styles";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { getMessages, sendMessage } from "services/Solicitacoes";
import Snack from "components/Snack";
import { Alert, IconButton, Menu, MenuItem } from "@mui/material";

import { CardChat } from "./CardChat";
import { DateTime } from "luxon";
import SendIcon from "@mui/icons-material/Send";

import Button from "@mui/material/Button";
import Empty from "components/Empty";
import Loading from "components/Loading/Loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DialogUpdateStatus } from "../DialogUpdateStatus";
import { DialogInfos } from "../DialogInfos";

export default function Details() {
  const { state } = useLocation();

  const request = state.request;

  const messagesEndRef = useRef<any>(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState<any>([]);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [openDialogUpdateStatus, setOpenDialogUpdateStatus] = useState(false);
  const [openDialogInfo, setOpenDialogInfo] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnack = (type: "error" | "success", text: string) => {
    setSnackStatus(true);
    setSnackType(type);
    setSnackMessage(text);
  };

  const { mutate: getMessagesMutation, isLoading: mutationGetMessagesLoading } =
    useMutation({
      mutationFn: (id: any) => getMessages(id),
      onSuccess: (data: any) => {
        setMsgList(data.messages.reverse());
      },
    });

  const { mutate: sendMessagesMutation } = useMutation({
    mutationFn: (data: any) => sendMessage(data),
    onSuccess: (data: any) => {
      setMsg("");
      data.success && getMessagesMutation(request.id_solicitacao);
    },
  });

  const sendNewMessage = () => {
    const dataSend = {
      id_solicitacao: request.id_solicitacao,
      justificativa: msg,
      id_status_leitura: "1",
      respondido_por: "2",
      dt_resposta: DateTime.now().toString(),
    };
    sendMessagesMutation(dataSend);
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgList]);

  useEffect(() => {
    getMessagesMutation(request.id_solicitacao);
  }, []);

  if (mutationGetMessagesLoading) return <Loading />;

  return (
    <>
      <S.Container>
        <S.Header>
          <S.WrapperHeader>
            <S.TitleContainer>
              <span>{request.nome.charAt(0)}</span>
            </S.TitleContainer>
            <S.BoldText>{request.nome}</S.BoldText>
          </S.WrapperHeader>
          <S.WrapperHeader>
            {request.status === "ATENDIDA" ? (
              <Alert severity="success">Solicitação finalizada</Alert>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setOpenDialogUpdateStatus(!openDialogUpdateStatus)
                  }
                >
                  Atualizar Status
                </Button>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon style={{ color: "#fff" }} />
                </IconButton>
              </>
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setOpenDialogInfo(!openDialogInfo)}>
                Solicitação
              </MenuItem>
            </Menu>
          </S.WrapperHeader>
        </S.Header>

        <S.WrapperMessages>
          {msgList && msgList.length > 0 ? (
            msgList.map((item: any) => {
              const dt = DateTime.fromISO(item.dt_resposta);
              const data = dt.toFormat("dd-LL-yyyy");
              const time = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
              return (
                <CardChat
                  key={item.id}
                  title={item.respondido_por === 2 ? "" : item.nome}
                  date={data}
                  hour={time}
                  message={item.justificativa}
                />
              );
            })
          ) : (
            <Empty text="Não há nenhuma mensagem" />
          )}
          <div ref={messagesEndRef} />
        </S.WrapperMessages>
        {request.status !== "ATENDIDA" && (
          <S.Footer>
            <S.Input
              placeholder="Digite uma mensagem"
              onChange={(event) => setMsg(event.target.value)}
              value={msg}
            />
            <Button
              disabled={msg.length === 0}
              onClick={sendNewMessage}
              variant="contained"
              endIcon={<SendIcon />}
              style={{ borderRadius: 30, justifyContent: "flex-start" }}
            />
          </S.Footer>
        )}
      </S.Container>

      <DialogUpdateStatus
        statusData={request.status}
        openDialog={openDialogUpdateStatus}
        setOpenDialog={setOpenDialogUpdateStatus}
        id_solicitacao={request.id_solicitacao}
        handleSnack={handleSnack}
      />

      <DialogInfos
        openDialog={openDialogInfo}
        setOpenDialog={setOpenDialogInfo}
        request={request}
      />

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </>
  );
}
