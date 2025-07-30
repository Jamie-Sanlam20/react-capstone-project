import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import { Button } from "@mui/material";
import {
  calculateDepreciatedValue,
  generateQuotes,
} from "../utils/calculateDepreciatedValue";

export function GetQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null); // Tracks selection

  useEffect(() => {
    fetch(`https://68871b87071f195ca97f46b5.mockapi.io/devices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDevice(data);
        const insuredValue = calculateDepreciatedValue(
          data.purchaseYear,
          data.price
        );
        const quoteOptions = generateQuotes(insuredValue);
        setQuotes(quoteOptions);
      });
  }, [id]);

  const handleConfirm = () => {
    if (!selectedQuoteId) return;
    navigate(`/confirm/${device.id}/${selectedQuoteId}`);
  };

  if (!device) return <p>Loading device info...</p>;

  return (
    <section className="quote-page">
      <h2 className="quote-heading">Quotes for {device.name}</h2>
      <div className="quote-details">
        <p>
          <strong>Original Price:</strong> R{device.price}
        </p>
        <p>
          <strong>Purchase Year:</strong> {device.purchaseYear}
        </p>
        <p>
          <strong>Insured Value (with 20% depreciation per annum): </strong> R
          {calculateDepreciatedValue(device.purchaseYear, device.price)}
        </p>
      </div>

      <h3 className="quote-heading">Insurance Options:</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {quotes.map((quote) => (
          <Quote
            key={quote.id}
            plan={quote}
            isSelected={quote.id === selectedQuoteId}
            onSelect={() => setSelectedQuoteId(quote.id)} // Pass handler
          />
        ))}
      </div>

      {selectedQuoteId && (
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{ marginTop: "1rem" }}
        >
          Confirm Plan
        </Button>
      )}
    </section>
  );
}
