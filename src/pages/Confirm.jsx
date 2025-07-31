import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import {
  calculateDepreciatedValue,
  generateQuotes,
  formatCurrency,
} from "../utils/CalculationHelpers";

export function Confirm() {
  const { deviceId, planId } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchDeviceAndQuote() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://68871b87071f195ca97f46b5.mockapi.io/devices/${deviceId}`
        );
        const data = await res.json();
        setDevice(data);

        const insuredValue = calculateDepreciatedValue(
          data.purchaseYear,
          data.price
        );
        const quotes = generateQuotes(insuredValue);
        const selected = quotes.find((q) => q.id === planId);
        setSelectedQuote(selected);
      } catch (error) {
        console.error("Failed to fetch device or quote", error);
      }
      setLoading(false);
    }
    fetchDeviceAndQuote();
  }, [deviceId, planId]);

  if (loading) return <p>Loading confirmation details...</p>;
  if (!device || !selectedQuote) return <p>Missing confirmation details.</p>;

  // Confirm insurance selection and update device
  const handleConfirm = async () => {
    setUpdating(true);
    try {
      const response = await fetch(
        `https://68871b87071f195ca97f46b5.mockapi.io/devices/${deviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...device,
            insuredValue: selectedQuote.insuredValue,
            insurancePlan: selectedQuote.planName,
            monthlyPremium: selectedQuote.monthlyPremium,
            excess: selectedQuote.excess,
            coverage: selectedQuote.coverage,
          }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update device with insurance");

      // Navigate back to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating device:", error);
      setUpdating(false);
    }
  };

  return (
    <section style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        🎉 Quote Confirmed!
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">📱 Device Details</Typography>
          <Typography>Name: {device.name}</Typography>
          <Typography>Brand: {device.brand}</Typography>
          <Typography>Purchase Year: {device.purchaseYear}</Typography>
          <Typography>
            Original Price: {formatCurrency(device.price)}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">🛡️ Insurance Plan</Typography>
          <Typography>Plan: {selectedQuote.planName}</Typography>
          <Typography>
            Monthly Premium: {formatCurrency(selectedQuote.monthlyPremium)}
          </Typography>
          <Typography>
            Excess: {formatCurrency(selectedQuote.excess)}
          </Typography>
          <Typography>Coverage:</Typography>
          <List className="coverage-list">
            {selectedQuote.coverage.map((item, index) => (
              <ListItem key={index}>• {item}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        disabled={updating}
      >
        {updating ? "Confirming..." : "Confirm Insurance"}
      </Button>
    </section>
  );
}
