import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Device } from "../components/Device";

export function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const navigate = useNavigate();

  const getDevices = async (search = "", brand = "") => {
    const url = new URL("https://68871b87071f195ca97f46b5.mockapi.io/devices");

    if (search) url.searchParams.append("search", search);
    if (brand) url.searchParams.append("brand", brand);

    const response = await fetch(url);
    const data = await response.json();
    setDevices(data);
  };

  useEffect(() => {
    getDevices();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    getDevices(searchTerm, brandFilter);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setBrandFilter(selectedBrand);
    getDevices(searchTerm, selectedBrand);
  };

  const deleteDevice = async (id) => {
    await fetch(`https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`, {
      method: "DELETE",
    });
    getDevices(searchTerm, brandFilter);
  };

  return (
    <div>
      {/* Search and Filter Form */}
      <form
        onSubmit={handleSearch}
        className="search-form-container"
        style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
      >
        <TextField
          className="search-bar"
          size="small"
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" style={{ minWidth: 150 }}>
          <InputLabel id="brand-label">Filter</InputLabel>
          <Select
            labelId="brand-label"
            value={brandFilter}
            onChange={handleBrandChange}
            label="Filter"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Apple">Apple</MenuItem>
            <MenuItem value="Samsung">Samsung</MenuItem>
            <MenuItem value="Huawei">Huawei</MenuItem>
            <MenuItem value="Nokia">Nokia</MenuItem>
            <MenuItem value="Xiaomi">Xiaomi</MenuItem>
            <MenuItem value="Microsoft">Microsoft</MenuItem>
          </Select>
        </FormControl>
      </form>

      {/* Device List */}
      <section className="device-list-container">
        {devices.map((device) => (
          <Device
            key={device.id}
            device={device}
            deleteBtn={
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteDevice(device.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            }
            editBtn={
              <IconButton
                onClick={() => navigate(`/edit/${device.id}`)}
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
