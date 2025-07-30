import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import {
  calculateDepreciatedValue,
  generateQuotes,
} from "../utils/calculateDepreciatedValue";

export function Confirm() {
  const { deviceId, planId } = useParams();
  const [device, setDevice] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <Typography>Original Price: R{device.price}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">🛡️ Insurance Plan</Typography>
          <Typography>Plan: {selectedQuote.planName}</Typography>
          <Typography>
            Monthly Premium: R{selectedQuote.monthlyPremium}
          </Typography>
          <Typography>Excess: {selectedQuote.excess}</Typography>
          <Typography>Coverage:</Typography>
          <List className="coverage-list">
            {selectedQuote.coverage.map((item, index) => (
              <ListItem key={index}>• {item}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </section>
  );
}
