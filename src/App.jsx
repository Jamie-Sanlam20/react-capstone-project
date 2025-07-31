import {
  CssBaseline,
  FormControlLabel,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ResponsiveAppBar } from "./components/Nav";
import { AddDevice } from "./pages/AddDevice";
import { Confirm } from "./pages/Confirm";
import { Dashboard } from "./pages/Dashboard";
import { EditDevice } from "./pages/EditDevice";
import { GetQuote } from "./pages/GetQuote";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./styles.css";
import { darkTheme, lightTheme } from "./theme";

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
