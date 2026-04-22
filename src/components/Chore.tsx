import {
  Box,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";

interface Props {
  name: string;
  label: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Chore({ name, label, changeHandler }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <FormLabel>{label}</FormLabel>
      <TextField
        type="date"
        name={name}
        value={name}
        onChange={changeHandler}
        variant="outlined"
      />
      <Button variant="contained" color="primary">
        ✓ Done today
      </Button>
    </Box>
  );
}
