import {
  ThemeProvider,
  CssBaseline,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddDevice } from "./pages/AddDevice";
import { Confirm } from "./pages/Confirm";
import { Dashboard } from "./pages/Dashboard";
import { GetQuote } from "./pages/GetQuote";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { EditDevice } from "./pages/EditDevice";
import { ResponsiveAppBar } from "./components/Nav";
import "./styles.css";
import { lightTheme, darkTheme } from "./theme";
import { useState } from "react";

// Component = UI + Logic
export default function App() {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        <ResponsiveAppBar />

        {/* Theme Toggle Switch */}
        <div className="theme-switch">
          <FormControlLabel
            control={
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            }
            label={mode === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </div>

        {/* Routing Setup */}
        <Routes>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="devices/new" element={<AddDevice />} />
          <Route path="/edit/:id" element={<EditDevice />} />
          <Route path="/quotes/:id" element={<GetQuote />} />
          <Route path="/confirm/:deviceId/:planId" element={<Confirm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
