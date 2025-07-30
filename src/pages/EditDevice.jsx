import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function EditDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  async function getDeviceById(id) {
    setIsLoading(true); // Start the loader
    const response = await fetch(
      `https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`
    );
    const device = await response.json();
    console.log(device);
    setIsLoading(false); // Stop the loader
    setDevice(device);
  }

  useEffect(() => {
    getDeviceById(id); // id from URL
  }, [id]);

  // Better UX
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  //   When device has data - Below will render
  return <EditDeviceForm device={device} />;
}

function EditDeviceForm({ device }) {
  // input box - variable
  //const [state, setState] = useState(INITIAL_Value)
  const [name, setName] = useState(device.name);
  const [brand, setBrand] = useState(device.brand);
  const [purchaseYear, setPurchaseYear] = useState(device.purchaseYear);
  const [price, setPrice] = useState(device.price);
  const [serialNumber, setSerialNumber] = useState(device.serialNumber);

  const navigate = useNavigate();

  const updateDevice = async (event) => {
    event.preventDefault();

    console.log("addDevice", name, brand);

    // Object Short hand
    const updatedDevice = {
      name,
      brand,
      purchaseYear,
      price,
      serialNumber,
    };

    // PUT
    // 1. method - PUT & id (URL)
    // 2. Body - data (JSON)
    // 3. Header - JSON - (Inform to the backend JSON data)

    const response = await fetch(
      `https://68871b87071f195ca97f46b5.mockapi.io/devices/${device.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedDevice),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    navigate("/dashboard"); // +1 -> go forward, -1 -> go back
  };

  return (
    <section className="edit-page">
      <img
        className="edit-image"
        src="https://www.svgrepo.com/download/210248/devices-tablet.svg"
        // src="https://cdn-icons-png.flaticon.com/512/9412/9412850.png"
        alt="edit-form-image"
      ></img>
      <div className="edit-form">
        <h1 className="edit-head">Edit {name}</h1>
        <form onSubmit={updateDevice} className="device-form-container">
          <TextField
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
            value={name}
          />
          <TextField
            onChange={(event) => setBrand(event.target.value)}
            type="text"
            placeholder="Brand"
            value={brand}
          />
          <TextField
            onChange={(event) => setSerialNumber(event.target.value)}
            type="text"
            placeholder="Serial Number"
            value={serialNumber}
          />
          <TextField
            onChange={(event) => setPurchaseYear(event.target.value)}
            type="text"
            placeholder="Purchase Year"
            value={purchaseYear}
          />
          <TextField
            onChange={(event) => setPrice(event.target.value)}
            type="text"
            placeholder="Original Purchase Price"
            value={price}
          />
          <Button type="submit" startIcon={<EditIcon />}>
            Save
          </Button>
        </form>
      </div>
    </section>
  );
}
