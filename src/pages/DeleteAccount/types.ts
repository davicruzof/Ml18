import React from "react";

export type ValueType = {
  target: { value: React.SetStateAction<any> };
};

export interface DialogProps {
  setOpen: (v: boolean) => void;
  open: boolean;
  row: any;
}
