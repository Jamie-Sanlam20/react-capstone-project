import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

// Presentation
export function Device({ device, deleteBtn, editBtn }) {
  return (
    <Card
      className="device-container"
      sx={{ maxWidth: 600, margin: "1rem auto", padding: 2 }}
      elevation={3}
    >
      <CardContent className="device-content-container">
        <div className="device-specs">
          <img
            className="phone-img"
            src="https://cdn-icons-png.flaticon.com/512/2397/2397574.png"
            alt="Device Icon"
            style={{ width: 60, height: 60 }}
          />

          <List dense>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Device Name</Typography>
                }
                secondary={<Typography>{device.name}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Device Type</Typography>
                }
                secondary={<Typography>{device.brand}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Serial Number</Typography>
                }
                secondary={<Typography>{device.serialNumber}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Purchase Year</Typography>
                }
                secondary={<Typography>{device.purchaseYear}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Original Price</Typography>
                }
                secondary={<Typography>R{device.price}</Typography>}
              />
            </ListItem>
          </List>
          <div className="edit-btn">{editBtn}</div>
        </div>

        <div className="btn-container">
          {deleteBtn}

          <Button
            variant="contained"
            component={Link}
            to={`/quotes/${device.id}`}
            endIcon={<SendIcon />}
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
