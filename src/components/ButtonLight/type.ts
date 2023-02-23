import { LoadingButtonProps } from "@mui/lab";

export interface ButtonProp {
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export interface typeButton extends LoadingButtonProps {
  isActive?: boolean;
}
