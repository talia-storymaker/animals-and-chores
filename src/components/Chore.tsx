import { Box, FormLabel, TextField, Button, Alert } from "@mui/material";
import { parse, addDays, format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

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
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    let timerId: number | undefined;

    const scheduleMidnightUpdate = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const msUntilMidnight = nextMidnight.getTime() - now.getTime();

      timerId = window.setTimeout(() => {
        setCurrentDate(new Date());
        scheduleMidnightUpdate();
      }, msUntilMidnight + 1000);
    };

    scheduleMidnightUpdate();

    return () => {
      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  const baseDate = parse(dayDone, "yyyy-MM-dd", currentDate);
  const dueDate =
    baseDate.toString() === "Invalid Date"
      ? currentDate
      : addDays(baseDate, dueInXDays || 1);
  const dayDoneDate = parse(dayDone, "yyyy-MM-dd", currentDate);

  function dueStatus() {
    switch (true) {
      case isSameDay(dayDoneDate, currentDate):
        return <Alert severity="success">OK</Alert>;
      case isSameDay(dueDate, currentDate):
        return <Alert severity="warning">Do today</Alert>;
      case dueDate < currentDate:
        return <Alert severity="error">Overdue</Alert>;
      case (dueDate < addDays(currentDate, 2)) && (dueInXDays || 1) > 1:
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
        slotProps={{ htmlInput: { max: format(currentDate, "yyyy-MM-dd") }}}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          const today = format(currentDate, "yyyy-MM-dd");

          const fakeEvent = {
            target: { name, value: today },
          } as React.ChangeEvent<HTMLInputElement>;

          changeHandler?.(fakeEvent);
        }}
        disabled={isSameDay(dayDoneDate, currentDate)}
      >
        ✓ Done today
      </Button>
      Next due: {format(dueDate, "MM/dd/yyyy")}
      {dueStatus()}
    </Box>
  );
}
