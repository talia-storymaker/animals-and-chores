import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  FormControl,
  FormLabel,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Chore from "./components/Chore";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#069b3a",
    },
    background: {
      default: "#ffe0f3",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

type category = "general" | "animal";
type animalSubcategory = "feedCats" | "litterbox" | "ghost";
interface Chore {
  name: string;
  label: string;
  category: category;
  dueInXDays?: number;
  doableByJacob?: boolean;
  animalSubcategory?: animalSubcategory;
}

const chores: Chore[] = [
  {
    name: "loadDishwasher",
    label: "Load dishwasher",
    category: "general",
    doableByJacob: true,
  },
  {
    name: "emptyDishwasher",
    label: "Empty dishwasher",
    category: "general",
    doableByJacob: true,
  },
  { name: "washLaundry", label: "Put laundry in washer", category: "general" },
  { name: "dryLaundry", label: "Put laundry in dryer", category: "general" },
  { name: "foldLaundry", label: "Fold laundry", category: "general", dueInXDays: 2},
  {
    name: "feedSeanMorning",
    label: "Feed Sean (morning)",
    category: "animal",
    animalSubcategory: "feedCats",
  },
  {
    name: "feedFenyxMorning",
    label: "Feed Fenyx (morning)",
    category: "animal",
    animalSubcategory: "feedCats",
  },
  {
    name: "feedSeanEvening",
    label: "Feed Sean (evening)",
    category: "animal",
    animalSubcategory: "feedCats",
  },
  {
    name: "feedFenyxEvening",
    label: "Feed Fenyx (evening)",
    category: "animal",
    animalSubcategory: "feedCats",
  },
  {
    name: "feedGhost",
    label: "Feed Ghost",
    category: "animal",
    animalSubcategory: "ghost",
    dueInXDays: 3,
  },
  {
    name: "washGhost",
    label: "Wash Ghost",
    category: "animal",
    animalSubcategory: "ghost",
    dueInXDays: 7,
  },
  {
    name: "litterboxBehindCouch",
    label: "Behind-couch litterbox",
    category: "animal",
    animalSubcategory: "litterbox",
    dueInXDays: 2,
  },
  {
    name: "litterboxBedroomCloset",
    label: "Bedroom closet litterbox",
    category: "animal",
    animalSubcategory: "litterbox",
    dueInXDays: 2,
  },
  {
    name: "litterboxLaundryRoom",
    label: "Laundry room litterbox",
    category: "animal",
    animalSubcategory: "litterbox",
    dueInXDays: 2,
  },
];

type ChoreName = (typeof chores)[number]["name"];
type ChoreStatus = Record<ChoreName, string>;

const initialChoresStatus: ChoreStatus = Object.fromEntries(
  chores.map((chore) => [chore.name, ""]),
) as ChoreStatus;

function App() {
  const [choresStatus, setChoresStatus] = useState(initialChoresStatus);

  useEffect(() => {
    chores.forEach((chore) => {
      const savedValue = localStorage.getItem(chore.name);
      if (savedValue) {
        setChoresStatus((prev) => ({
          ...prev,
          [chore.name]: savedValue,
        }));
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChoresStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
    localStorage.setItem(name, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Animals and Chores: A Tracker
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            General Chores
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 600 }}
              >
                Jacob, Talia, & Hunter
              </FormLabel>
              <Stack spacing={2}>
                {chores.map((chore) => {
                  if (chore.doableByJacob) {
                    return (
                      <Chore
                        key={chore.name}
                        name={chore.name}
                        label={chore.label}
                        dayDone={choresStatus[chore.name]}
                        changeHandler={handleChange}
                        dueInXDays={chore.dueInXDays}
                      />
                    );
                  }
                  return null;
                })}
              </Stack>
            </FormControl>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 600 }}
              >
                Talia & Hunter
              </FormLabel>
              <Stack spacing={2}>
                {chores.map((chore) => {
                  if (!chore.doableByJacob && chore.category === "general") {
                    return (
                      <Chore
                        key={chore.name}
                        name={chore.name}
                        label={chore.label}
                        dayDone={choresStatus[chore.name]}
                        changeHandler={handleChange}
                        dueInXDays={chore.dueInXDays}
                      />
                    );
                  }
                  return null;
                })}
              </Stack>
            </FormControl>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Animal Chores
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 600 }}
              >
                Feeding Cats
              </FormLabel>
              <Stack spacing={2}>
                {chores.map((chore) => {
                  if (chore.animalSubcategory === "feedCats") {
                    return (
                      <Chore
                        key={chore.name}
                        name={chore.name}
                        label={chore.label}
                        dayDone={choresStatus[chore.name]}
                        changeHandler={handleChange}
                        dueInXDays={chore.dueInXDays}
                      />
                    );
                  }
                  return null;
                })}
              </Stack>
            </FormControl>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 600 }}
              >
                Litterboxes
              </FormLabel>
              <Stack spacing={2}>
                {chores.map((chore) => {
                  if (chore.animalSubcategory === "litterbox") {
                    return (
                      <Chore
                        key={chore.name}
                        name={chore.name}
                        label={chore.label}
                        dayDone={choresStatus[chore.name]}
                        changeHandler={handleChange}
                        dueInXDays={chore.dueInXDays}
                      />
                    );
                  }
                  return null;
                })}
              </Stack>
            </FormControl>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 600 }}
              >
                Ghost
              </FormLabel>
              <Stack spacing={2}>
                {chores.map((chore) => {
                  if (chore.animalSubcategory === "ghost") {
                    return (
                      <Chore
                        key={chore.name}
                        name={chore.name}
                        label={chore.label}
                        dayDone={choresStatus[chore.name]}
                        changeHandler={handleChange}
                        dueInXDays={chore.dueInXDays}
                      />
                    );
                  }
                  return null;
                })}
              </Stack>
            </FormControl>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
