import { JSXElementConstructor, MouseEventHandler, ReactElement } from "react";

export type DialogProps = {
  open: boolean;
  disableClose?: boolean;
  title: string;
  setOpen: (arg0: boolean) => void;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  buttonConfirmText: string;
  handleButtonConfirm: MouseEventHandler<HTMLButtonElement> | undefined;
};
