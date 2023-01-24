import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function SelectComponent({
  itens,
  handleChange,
  value,
  label,
  disable = false,
}: {
  itens: Array<string>;
  value: string;
  label: string;
  disable?: boolean;
  handleChange: (event: SelectChangeEvent<any>) => void;
}) {
  return (
    <FormControl style={{ flex: 1 }}>
      <InputLabel id="simple-select-label">{label}</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
        disabled={disable}
        label={label}
        onChange={handleChange}
      >
        {itens &&
          itens.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
