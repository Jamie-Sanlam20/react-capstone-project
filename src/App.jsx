// import { Typography } from "@mui/material";
// import { Link, Navigate, Route, Routes } from "react-router";
// import { AddDevice } from "./pages/AddDevice";
// import { Confirm } from "./pages/Confirm";
// import { Dashboard } from "./pages/Dashboard";
// import { GetQuote } from "./pages/GetQuote";
// import { Home } from "./pages/Home";
// import { NotFound } from "./pages/NotFound";
// import { EditDevice } from "./pages/EditDevice";
// import { ResponsiveAppBar } from "./components/Nav";
// import "./styles.css";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { lightTheme, darkTheme } from "./theme";
// import { useState } from "react";

// // Component = UI + Logic
// // Default Export
// export default function App() {
//   const [mode, setMode] = useState("light");
//   const theme = mode === "light" ? lightTheme : darkTheme;

//   const toggleTheme = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };
//   return (

//     <div className="App">
//       {/* <header className="header">
//         <div className="company-details">
//           <img
//             className="logo"
//             src="https://www.freeiconspng.com/uploads/mobile-multiple-devices-icon--windows-8-iconset--icons8-14.png"
//           ></img>
//           <Typography variant="h5">TechProtect</Typography>
//         </div>
//         <nav className="nav-buttons">
//           <ul>
//             <li>
//               <Link to="/">Home </Link>
//             </li>
//             <li>
//               <Link to="/dashboard">Dashboard </Link>
//             </li>
//             <li>
//               <Link to="/devices/new">Add Device </Link>
//             </li>
//           </ul>
//         </nav>
//       </header> */}

//       <ResponsiveAppBar />

//       {/* Routing Setup */}
//       <Routes>
//         {/* Redirect - /home -> /  */}
//         <Route path="home" element={<Navigate to="/" replace />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="devices/new" element={<AddDevice />} />
//         <Route path="/edit/:id" element={<EditDevice />} />
//         <Route path="/quotes/:id" element={<GetQuote />} />
//         <Route path="/confirm/:deviceId/:planId" element={<Confirm />} />

//         {/* Catch all route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>

//   );
// }

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
