import { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Presentation
export function Device({ device, deleteBtn }) {
  return (
    <Card
      className="device-container"
      sx={{ maxWidth: 600, margin: "1rem auto", padding: 2 }}
      elevation={3}
    >
      <CardContent className="device-content-container">
        <div
          className="device-specs"
          style={{ display: "flex", gap: "1.5rem" }}
        >
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
        </div>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to={`/quotes/${device.id}`}
          >
            Get Quote
          </Button>

          <Button variant="outlined" component={Link} to={`/edit/${device.id}`}>
            Edit
          </Button>

          {deleteBtn}
        </div>
      </CardContent>
    </Card>
  );
}
