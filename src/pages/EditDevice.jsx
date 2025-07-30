import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export function EditDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDevice() {
      setIsLoading(true);
      const response = await fetch(
        `https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`
      );
      const data = await response.json();
      setDevice(data);
      setIsLoading(false);
    }

    fetchDevice();
  }, [id]);

  if (isLoading || !device) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return <EditDeviceForm device={device} />;
}

function EditDeviceForm({ device }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    brand: Yup.string().required("Required"),
    serialNumber: Yup.string().required("Required"),
    purchaseYear: Yup.number()
      .required("Required")
      .min(1900, "Invalid year")
      .max(new Date().getFullYear(), "Cannot be in the future"),
    price: Yup.number().required("Required").positive("Must be positive"),
  });

  const handleSubmit = async (values) => {
    await fetch(
      `https://68871b87071f195ca97f46b5.mockapi.io/devices/${device.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    navigate("/dashboard");
  };

  return (
    <section className="edit-page">
      <img
        className="edit-image"
        src="https://www.svgrepo.com/download/210248/devices-tablet.svg"
        alt="edit-device"
      />
      <div className="edit-form">
        <Typography variant="h4" className="edit-head">
          Edit {device.name}
        </Typography>

        <Formik
          initialValues={{
            name: device.name || "",
            brand: device.brand || "",
            serialNumber: device.serialNumber || "",
            purchaseYear: device.purchaseYear || "",
            price: device.price || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form className="device-form-container">
              <TextField
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
                margin="normal"
              />

              <TextField
                name="brand"
                label="Brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
                fullWidth
                margin="normal"
              />

              <TextField
                name="serialNumber"
                label="Serial Number"
                value={values.serialNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.serialNumber && Boolean(errors.serialNumber)}
                helperText={touched.serialNumber && errors.serialNumber}
                fullWidth
                margin="normal"
              />

              <TextField
                name="purchaseYear"
                label="Purchase Year"
                value={values.purchaseYear}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchaseYear && Boolean(errors.purchaseYear)}
                helperText={touched.purchaseYear && errors.purchaseYear}
                fullWidth
                margin="normal"
              />

              <TextField
                name="price"
                label="Original Purchase Price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                fullWidth
                margin="normal"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
