import { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";

const deviceSchema = yup.object({
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

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        brand: "",
        serialNumber: "",
        purchaseYear: "",
        price: "",
      },
      validationSchema: deviceSchema,
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

          navigate("/dashboard");
        } catch (error) {
          console.error("Error adding device:", error.message);
        }
      },
    });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Add a New Device
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
          }}
        >
          <TextField
            fullWidth
            name="name"
            label="Device Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            name="brand"
            label="Brand"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.brand && Boolean(errors.brand)}
            helperText={touched.brand && errors.brand}
          />

          <TextField
            fullWidth
            name="serialNumber"
            label="Serial Number"
            value={values.serialNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.serialNumber && Boolean(errors.serialNumber)}
            helperText={touched.serialNumber && errors.serialNumber}
          />

          <TextField
            fullWidth
            name="purchaseYear"
            label="Purchase Year"
            type="number"
            value={values.purchaseYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.purchaseYear && Boolean(errors.purchaseYear)}
            helperText={touched.purchaseYear && errors.purchaseYear}
          />

          <TextField
            fullWidth
            name="price"
            label="Original Purchase Price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Add Device
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
