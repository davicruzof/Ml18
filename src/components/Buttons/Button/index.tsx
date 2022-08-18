import { LoadingButton } from "@mui/lab";

const Button = ({ title, active, ...props }: any) => {
  return (
    <LoadingButton
      {...props}
      size="large"
      variant="contained"
      disabled={active}
      style={{
        backgroundColor: active && "#cacaca",
      }}
      sx={{ mt: 3 }}
    >
      {title}
    </LoadingButton>
  );
};

export default Button;
