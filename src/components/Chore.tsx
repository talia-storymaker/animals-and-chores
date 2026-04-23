import { Box, FormLabel, TextField, Button, Alert } from "@mui/material";
import { parse, addDays, format } from "date-fns";

interface Props {
  name: string;
  label: string;
  dayDone: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dueInXDays?: number;
}

export default function Chore({
  name,
  label,
  dayDone,
  changeHandler,
  dueInXDays,
}: Props) {
  const baseDate = parse(dayDone, "yyyy-MM-dd", new Date());
  const dueDate =
    baseDate.toString() === "Invalid Date"
      ? new Date()
      : addDays(baseDate, dueInXDays || 1);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: ".75fr 1fr 1fr 1fr .75fr",
        alignItems: "center",
        gap: 2,
      }}
    >
      <FormLabel>{label}</FormLabel>
      <TextField
        type="date"
        name={name}
        value={dayDone}
        onChange={changeHandler}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          const today = format(new Date(), "yyyy-MM-dd");

          const fakeEvent = {
            target: { name, value: today },
          } as React.ChangeEvent<HTMLInputElement>;

          changeHandler?.(fakeEvent);
        }}
      >
        ✓ Done today
      </Button>
      Next due: {format(dueDate, "MM/dd/yyyy")}
      {dueDate < new Date() && (
        <Alert severity="warning">
          Overdue
        </Alert>
      )}
    </Box>
  );
}
