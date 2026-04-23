import { Box, FormLabel, TextField, Button, Alert } from "@mui/material";
import { parse, addDays, format, isSameDay } from "date-fns";

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
  const dayDoneDate = parse(dayDone, "yyyy-MM-dd", new Date());

  function dueStatus() {
    switch (true) {
      case isSameDay(dayDoneDate, new Date()):
        return <Alert severity="success">OK</Alert>;
      case isSameDay(dueDate, new Date()):
        return <Alert severity="warning">Do today</Alert>;
      case dueDate < new Date():
        return <Alert severity="error">Overdue</Alert>;
      case (dueDate < addDays(new Date(), 2)) && (dueInXDays || 1) > 1:
        return <Alert severity="info">Do soon</Alert>;
      default:
        return <Alert severity="success">OK</Alert>;
    }
  }

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
        slotProps={{ htmlInput: { max: format(new Date(), "yyyy-MM-dd") }}}
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
        disabled={isSameDay(dayDoneDate, new Date())}
      >
        ✓ Done today
      </Button>
      Next due: {format(dueDate, "MM/dd/yyyy")}
      {dueStatus()}
    </Box>
  );
}
