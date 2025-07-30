// --- Calculation Helpers ---

export function calculateDepreciatedValue(purchaseYear, originalPrice) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - purchaseYear;
  const depreciationRate = 0.2;
  let depreciatedValue = originalPrice * Math.pow(1 - depreciationRate, age);
  const minValue = originalPrice * 0.2;
  if (depreciatedValue < minValue) depreciatedValue = minValue;
  return Math.round(depreciatedValue);
}

export function generateQuotes(insuredValue) {
  return [
    {
      id: "bsc",
      planName: "Basic Cover",
      monthlyPremium: (insuredValue * 0.04).toFixed(2),
      coverage: ["Accidental Damage"],
      excess: "R500",
    },
    {
      id: "std",
      planName: "Standard Cover",
      monthlyPremium: (insuredValue * 0.06).toFixed(2),
      coverage: ["Accidental Damage", "Power Surge", "Theft"],
      excess: "R300",
    },
    {
      id: "prem",
      planName: "Premium Cover",
      monthlyPremium: (insuredValue * 0.08).toFixed(2),
      coverage: ["Full Coverage incl. Liquid Damage", "Theft", "Power Surge"],
      excess: "R150",
    },
  ];
}
