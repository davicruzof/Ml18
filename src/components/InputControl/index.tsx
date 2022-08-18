import Input from "components/Input";
import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import { cpf } from "cpf-cnpj-validator";

function InputForm({ control, name, ...rest }: any): ReactElement {
  return (
    <div>
      <Controller
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <Input
            label={name}
            name={name}
            id={name}
            value={name === "cpf" ? cpf.format(value) : value}
            onChange={onChange}
            {...rest}
          />
        )}
        name={name}
      />
    </div>
  );
}

export { InputForm };
