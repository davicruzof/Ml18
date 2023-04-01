import { listRequestResponse } from "services/Solicitacoes/types";
import React from "react";

export type ValueType = {
  target: { value: React.SetStateAction<any> };
};

export interface DialogProps {
  setOpenDialog: (v: boolean) => void;
  setStatus: (v: string) => void;
  openDialog: boolean;
  status: string;
  updateStatusRequest: ({}) => void;
  request: listRequestResponse;
}
