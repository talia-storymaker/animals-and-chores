import { Box, FormLabel, TextField, Button } from "@mui/material";

interface Props {
  name: string;
  label: string;
  value: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Chore({ name, label, value, changeHandler }: Props) {
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
        value={value}
        onChange={changeHandler}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          const today = new Date().toISOString().split('T')[0];
          const fakeEvent = {
            target: { name, value: today }
          } as React.ChangeEvent<HTMLInputElement>;
          changeHandler?.(fakeEvent);
        }}
      >
        ✓ Done today
      </Button>
    </Box>
  );
}
