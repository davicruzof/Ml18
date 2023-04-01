import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function InputPassword({
  control,
  showPassword,
  name,
  setShowPassword,
}: any): ReactElement {
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Controller
        control={control}
        render={({ field }) => (
          <FormControl sx={{ mb: 1 }} fullWidth variant="outlined">
            <label>Senha</label>
            <OutlinedInput
              fullWidth
              name="senha"
              id="outlined-adornment-password"
              autoComplete="off"
              required
              onChange={field.onChange}
              value={field.value}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        )}
        name={name}
      />
    </div>
  );
}

export default InputPassword;
