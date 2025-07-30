import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Device } from "../components/Device";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

export function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  async function getDevices(searchTerm = "") {
    const url = new URL("https://68871b87071f195ca97f46b5.mockapi.io/devices");

    if (searchTerm) {
      url.searchParams.append("search", searchTerm);
    }

    const response = await fetch(url, { method: "GET" });
    const devices = await response.json();
    setDevices(devices);
  }

  useEffect(() => {
    getDevices();
  }, []); // [] -> Empty Dependency array

  const deleteDevice = async (id) => {
    console.log("Deleting....", id); // id of the device
    const response = await fetch(
      `https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`,
      { method: "DELETE" }
    );
    const device = await response.json();
    console.log("Deleted", device);
    // Refresh Data
    getDevices();
  };

  const searchDevices = (event) => {
    event.preventDefault();
    console.log("Search Term:", searchTerm);
    getDevices(searchTerm);
  };

  return (
    <div>
      <form onSubmit={searchDevices} className="color-form-container">
        <TextField
          className="search-bar"
          size="small"
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search"
          type="text"
          variant="outlined"
        />

        <IconButton color="primary" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>

      <section className="device-list-container">
        {devices.map((device) => (
          <Device
            key={device.id}
            device={device}
            deleteBtn={
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteDevice(device.id)}
              >
                {" "}
                Delete
              </Button>
            }
            editBtn={
              <IconButton
                color="secondary"
                onClick={() => navigate(`/devices/edit/${device.id}`)}
                aria-label={`Edit ${device.name} device`}
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </section>
    </div>
  );
}
