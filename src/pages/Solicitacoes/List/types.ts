export interface DialogProps {
  setOpenDialog: (v: boolean) => void;
  openDialog: boolean;
  handleChange: () => void;
  children: any;
}
