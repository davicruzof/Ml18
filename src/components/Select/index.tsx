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
}: {
  itens: Array<string>;
  value: string;
  label: string;
  handleChange: (event: SelectChangeEvent<any>) => void;
}) {
  return (
    <FormControl>
      <InputLabel id="simple-select-label">{label}</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
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
