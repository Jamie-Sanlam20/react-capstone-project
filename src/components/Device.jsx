import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/CalculationHelpers";

export function Device({ device, deleteBtn, editBtn, insuranceInfo }) {
  return (
    <Card
      className="device-container"
      sx={{ maxWidth: 600, margin: "1rem auto", padding: 2 }}
      elevation={3}
    >
      <CardContent className="device-content-container">
        <div>
          <div className="device-specs">
            <img
              className="phone-img"
              src="https://cdn-icons-png.flaticon.com/512/2397/2397574.png"
              alt="Device Icon"
            />

            <div>
              <Typography variant="subtitle2">Device Name</Typography>
              <Typography>{device.name}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Device Type
              </Typography>
              <Typography>{device.brand}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Serial Number
              </Typography>
              <Typography>{device.serialNumber}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Purchase Year
              </Typography>
              <Typography>{device.purchaseYear}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Original Price
              </Typography>
              <Typography>{formatCurrency(device.price)}</Typography>
            </div>
            {editBtn}
          </div>

          {/* Insurance info */}
          {insuranceInfo}
        </div>

        <div className="btn-container">
          {deleteBtn}
          <Button
            variant="contained"
            component={Link}
            to={`/quotes/${device.id}`}
            startIcon={<SendIcon />}
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
