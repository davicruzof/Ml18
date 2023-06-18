import { useEffect, useRef, useState } from "react";

import * as S from "./styles";
import { useLocation } from "react-router-dom";
import { returnTime } from "utils/format";
import Dialog from "../List/updateStatus";
import { useMutation } from "react-query";
import { getMessages, sendMessage, updateRequest } from "services/Solicitacoes";
import Snack from "components/Snack";
import Button from "components/Button";
import { AccordionDetails, Fab } from "@mui/material";

import DropDown from "@mui/icons-material/ArrowDropDownOutlined";
import DropUp from "@mui/icons-material/ArrowDropUpOutlined";
import { CardChat } from "./CardChat";
import { DateTime } from "luxon";
import { ArrowUpward } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

import ButtonMuiu from "@mui/material/Button";
import EmptyMessages from "./EmptyMessages/EmptyRequest";
import Empty from "components/Empty";
import Loading from "components/Loading/Loading";

export default function Details() {
  const { state } = useLocation();

  const request = state.request;

  const messagesEndRef = useRef(null);
  const topRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState<any>([]);
  const [snackMessage, setSnackMessage] = useState("");
  const [status, setStatus] = useState(request.status);
  const [snackStatus, setSnackStatus] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const [expanded, setExpanded] = useState(false);

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

  const { mutate: updateStatusRequest } =
    useMutation({
      mutationFn: (formData: any) => updateRequest(formData),
      onSuccess: () => {
        handleSnack("success", "Solicitação atualizada com sucesso!");

        setOpenDialog(false);
      },
      onError: () => {
        handleSnack("error", "Ocorreu um erro, tente novamente!");
      },
    });

  const handleUpdateStatus = () => {
    updateStatusRequest({ status, id_solicitacao: request.id_solicitacao });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgList]);

  useEffect(() => {
    getMessagesMutation(request.id_solicitacao);
  }, []);

  if (mutationGetMessagesLoading || ) return <Loading />;

  return (
    <>
      <S.Container>
        <S.Header
          ref={topRef}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        >
          <S.HeaderTitle aria-controls="panel1d-content" id="panel1d-header">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <S.BoldText>Solicitação</S.BoldText>
              {expanded ? (
                <DropUp style={{ color: "#fff" }} />
              ) : (
                <DropDown style={{ color: "#fff" }} />
              )}
            </div>
          </S.HeaderTitle>
          <AccordionDetails>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <S.WrapperHeader>
                <S.Info>
                  Solicitante: <S.BoldText>{request.nome}</S.BoldText>
                </S.Info>
                <S.Info>
                  Departamento: <S.BoldText>{request.area}</S.BoldText>
                </S.Info>
                <S.Info>
                  Justificativa:{" "}
                  <S.BoldText>{request.justificativa}</S.BoldText>
                </S.Info>
                <S.Info>
                  Atualizado há {returnTime(request?.atualizado_a)}
                </S.Info>
              </S.WrapperHeader>
              {request.status !== "ATENDIDA" && (
                <Button
                  title="Atualizar Status"
                  onClick={() => setOpenDialog(!openDialog)}
                />
              )}
            </div>
          </AccordionDetails>
        </S.Header>

        <S.Wrapper>
          {msgList && msgList.length > 0 ? (
            msgList.map((item: any) => {
              const dt = DateTime.fromISO(item.dt_resposta);
              const data = dt.toFormat("dd-LL-yyyy");
              const time = dt.toFormat("hh:mm");
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
          {msgList.length > 3 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 100,
              }}
            >
              <Fab
                color="primary"
                onClick={() =>
                  topRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <ArrowUpward />
              </Fab>
            </div>
          )}
        </S.Wrapper>
        {request.status !== "ATENDIDA" && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: 20,
              zIndex: 9999,
              width: "100%",
              background: "#fff",
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <S.Input
              placeholder="Digite uma mensagem"
              onChange={(event) => setMsg(event.target.value)}
              value={msg}
            />
            <ButtonMuiu
              disabled={msg.length === 0}
              onClick={sendNewMessage}
              variant="contained"
              endIcon={<SendIcon />}
              style={{ borderRadius: 30, justifyContent: "flex-start" }}
            />
          </div>
        )}
      </S.Container>

      <Dialog
        setStatus={setStatus}
        status={status}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleChange={handleUpdateStatus}
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
