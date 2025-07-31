import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import { Button, Typography } from "@mui/material";
import {
  calculateDepreciatedValue,
  generateQuotes,
  formatCurrency,
} from "../utils/CalculationHelpers";

export function GetQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);

  useEffect(() => {
    async function fetchDevice() {
      try {
        const res = await fetch(
          `https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`
        );
        const data = await res.json();

        setDevice(data);

        const insuredValue = calculateDepreciatedValue(
          data.purchaseYear,
          data.price
        );
        const quoteOptions = generateQuotes(insuredValue);

        setQuotes(Array.isArray(quoteOptions) ? quoteOptions : []);
      } catch (error) {
        console.error("Error fetching device:", error.message);
      }
    }

    fetchDevice();
  }, [id]);

  const handleConfirm = () => {
    if (!selectedQuoteId || !device?.id) return;
    navigate(`/confirm/${device.id}/${selectedQuoteId}`);
  };

  if (!device) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>
        Loading device info...
      </Typography>
    );
  }

  const insuredValue = calculateDepreciatedValue(
    device.purchaseYear,
    device.price
  );

  return (
    <section className="quote-page">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Quotes for {device.brand} {device.name}
      </Typography>

      <div className="quote-details">
        <Typography>
          <strong>Original Price:</strong> {formatCurrency(device.price)}
        </Typography>
        <Typography>
          <strong>Purchase Year:</strong> {device.purchaseYear}
        </Typography>
        <Typography>
          <strong>Insured Value:</strong> {formatCurrency(insuredValue)}
        </Typography>
      </div>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Insurance Options
      </Typography>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {quotes.map((quote) => (
          <Quote
            key={quote.id}
            plan={quote}
            isSelected={quote.id === selectedQuoteId}
            onSelect={() => setSelectedQuoteId(quote.id)}
          />
        ))}
      </div>

      {selectedQuoteId && (
        <Button variant="contained" onClick={handleConfirm} sx={{ mt: 3 }}>
          Confirm Plan
        </Button>
      )}
    </section>
  );
}
