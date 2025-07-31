import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Device } from "../components/Device";
import { formatCurrency } from "../utils/CalculationHelpers";

export function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function getDevices(search = "", brand = "") {
    setLoading(true);
    const url = new URL("https://68871b87071f195ca97f46b5.mockapi.io/devices");

    if (search) url.searchParams.append("search", search);
    if (brand) url.searchParams.append("brand", brand);

    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched devices:", data);
    setDevices(Array.isArray(data) ? data : []);
    setLoading(false);
  }

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
      <form onSubmit={handleSearch} className="search-form-container">
        <TextField
          className="search-bar"
          size="small"
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" style={{ minWidth: 150, marginLeft: "1rem" }}>
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
        {loading ? (
          <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
            Loading devices...
          </Typography>
        ) : Array.isArray(devices) && devices.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
            {brandFilter ? "No phones available" : "No devices found."}
          </Typography>
        ) : (
          Array.isArray(devices) &&
          devices.map((device) => (
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
                  color="primary"
                  onClick={() => navigate(`/edit/${device.id}`)}
                  aria-label={`Edit ${device.name} device`}
                >
                  <EditIcon />
                </IconButton>
              }
              insuranceInfo={
                device.insurancePlan &&
                device.insuredValue != null &&
                device.monthlyPremium != null &&
                device.excess != null ? (
                  <div style={{ marginTop: 8 }}>
                    <Typography variant="subtitle2">
                      Insurance Details:
                    </Typography>
                    <Typography>Plan: {device.insurancePlan}</Typography>
                    <Typography>
                      Insured Value: {formatCurrency(device.insuredValue)}
                    </Typography>
                    <Typography>
                      Monthly Premium: {formatCurrency(device.monthlyPremium)}
                    </Typography>
                    <Typography>
                      Excess: {formatCurrency(device.excess)}
                    </Typography>
                  </div>
                ) : (
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ marginTop: 1, fontStyle: "italic" }}
                  >
                    Not insured
                  </Typography>
                )
              }
            />
          ))
        )}
      </section>
    </div>
  );
}
