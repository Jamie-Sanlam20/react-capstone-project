import { Typography } from "@mui/material";

export function Home() {
  return (
    <div className="banner">
      <div className="banner-text">
        <Typography variant="h3" className="banner-title">
          Welcome to TechProtect: Your device insurance provider
        </Typography>
        <Typography variant="h5" className="banner-subtitle">
          Protect your tech with flexible plans and hassle-free claims.
        </Typography>
      </div>
    </div>
  );
}
