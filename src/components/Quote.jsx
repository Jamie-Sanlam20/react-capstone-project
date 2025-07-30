import { Card, CardContent, Typography, Button } from "@mui/material";

export function Quote({ plan, isSelected, onSelect }) {
  return (
    <Card
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
        backgroundColor: isSelected ? "#e3f2fd" : "white",
        width: 250,
        userSelect: "none",
      }}
      raised={isSelected}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {plan.planName}
        </Typography>
        <Typography>
          <strong>Monthly Premium:</strong> R{plan.monthlyPremium}
        </Typography>
        <Typography>
          <strong>Coverage:</strong> {plan.coverage.join(", ")}
        </Typography>
        <Typography>
          <strong>Excess:</strong> {plan.excess}
        </Typography>
        <Button
          variant={isSelected ? "contained" : "outlined"}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          sx={{ marginTop: 1 }}
          fullWidth
        >
          {isSelected ? "Selected" : "Select Plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
