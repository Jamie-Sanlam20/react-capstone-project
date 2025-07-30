import { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Device name is required"),

  brand: yup.string().required("Brand is required"),

  serialNumber: yup.string().required("Serial number is required"),

  purchaseYear: yup
    .number()
    .typeError("Purchase year must be numbers")
    .min(2000, "Year must be 2000 or later")
    .max(new Date().getFullYear(), `Year can't be in the future`)
    .required("Purchase year is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price must be a positive number")
    .required("Price is required"),
});

export function AddDevice() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      serialNumber: "",
      purchaseYear: "",
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://68871b87071f195ca97f46b5.mockapi.io/devices",
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add device");
        }

        navigate("/dashboard"); // Go to dashboard after submission
      } catch (error) {
        console.error("Error adding device:", error.message);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="brand"
          name="brand"
          label="Brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />

        <TextField
          fullWidth
          id="serialNumber"
          name="serialNumber"
          label="Serial Number"
          value={formik.values.serialNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.serialNumber && Boolean(formik.errors.serialNumber)
          }
          helperText={formik.touched.serialNumber && formik.errors.serialNumber}
        />

        <TextField
          fullWidth
          id="purchaseYear"
          name="purchaseYear"
          label="Purchase Year"
          type="number"
          value={formik.values.purchaseYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.purchaseYear && Boolean(formik.errors.purchaseYear)
          }
          helperText={formik.touched.purchaseYear && formik.errors.purchaseYear}
        />

        <TextField
          fullWidth
          id="price"
          name="price"
          label="Original Purchase Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

// /movies/new - AddMovie
// export function AddDevice() {
//   // input box - variable

//   //   [{"id":100,"name":"iPhone 13 Pro","brand":"Apple","purchaseYear":2022,"price":18999,"serialNumber":"APL-001XZ"}
//   const [name, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [purchaseYear, setPurchaseYear] = useState("");
//   const [price, setPrice] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");
//   const navigate = useNavigate();

//   const addDevice = async (event) => {
//     event.preventDefault(); // Prevent Refesh Behaviour

//     // setColors([...colors, color]);
//     console.log("addDevice", name, brand);

//     // Object Short hand
//     const newDevice = {
//       name,
//       brand,
//       purchaseYear,
//       price,
//       serialNumber,
//     };

//     // // Copy the existing movies + New movie
//     // setMovies([...movies, newMovie]);
//     // API Call

//     // POST
//     // 1. method - POST
//     // 2. Body - data (JSON)
//     // 3. Header - JSON - (Inform to the backend JSON data)

//     const response = await fetch(
//       "https://68871b87071f195ca97f46b5.mockapi.io/devices",
//       {
//         method: "POST",
//         body: JSON.stringify(newDevice),
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//     );

//     navigate("/dashboard"); // +1 -> go forward, -1 -> go back
//   };

//   return (
//     <form onSubmit={addDevice} className="device-form-container">
//       <TextField
//         onChange={(event) => setName(event.target.value)}
//         type="text"
//         label="Device Name"
//       />
//       <TextField
//         onChange={(event) => setBrand(event.target.value)}
//         type="text"
//         label="Device Brand"
//       />
//       <TextField
//         onChange={(event) => setSerialNumber(event.target.value)}
//         type="text"
//         label="Serial Number"
//       />
//       <TextField
//         onChange={(event) => setPurchaseYear(event.target.value)}
//         type="text"
//         label="Purchase Year"
//       />
//       <TextField
//         onChange={(event) => setPrice(event.target.value)}
//         type="text"
//         label="Original Purchase Price"
//       />

//       {/* Task 1.2 Add Box to the List */}
//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// }
