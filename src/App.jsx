import { Typography } from "@mui/material";
import { Link, Navigate, Route, Routes } from "react-router";
import { AddDevice } from "./pages/AddDevice";
import { Confirm } from "./pages/Confirm";
import { Dashboard } from "./pages/Dashboard";
import { GetQuote } from "./pages/GetQuote";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { EditDevice } from "./pages/EditDevice";
import { ResponsiveAppBar } from "./components/Nav";
import "./styles.css";

// Component = UI + Logic
// Default Export
export default function App() {
  return (
    <div className="App">
      {/* <header className="header">
        <div className="company-details">
          <img
            className="logo"
            src="https://www.freeiconspng.com/uploads/mobile-multiple-devices-icon--windows-8-iconset--icons8-14.png"
          ></img>
          <Typography variant="h5">TechProtect</Typography>
        </div>
        <nav className="nav-buttons">
          <ul>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard </Link>
            </li>
            <li>
              <Link to="/devices/new">Add Device </Link>
            </li>
          </ul>
        </nav>
      </header> */}

      <ResponsiveAppBar />

      {/* Routing Setup */}
      <Routes>
        {/* Redirect - /home -> /  */}
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="devices/new" element={<AddDevice />} />
        <Route path="/edit/:id" element={<EditDevice />} />
        <Route path="/quotes/:id" element={<GetQuote />} />
        <Route path="/confirm/:deviceId/:planId" element={<Confirm />} />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
