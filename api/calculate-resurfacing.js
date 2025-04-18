export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST supported" });

  const { length, width, depth, messurmentSystem = false } = req.body;
  const isMetric = messurmentSystem;
  const volume = length * width * (depth / (isMetric ? 100 : 12));
  const round = (n) => Math.round(n * 100) / 100;

  const result = {
    calculatorUsed: "resurfacing",
    resultVolume: { value: round(volume), unit: isMetric ? "m³" : "ft³" },
    recommendedProduct: {
      name: "Flo-Coat® Resurfacer",
      bags: [{ weight: "40lb", count: Math.ceil(volume / 0.4) }]
    },
    otherProducts: [
      {
        name: "Sand Mix",
        bags: [{ weight: "60lb", count: Math.ceil(volume / 0.45) }]
      }
    ]
  };

  res.status(200).json(result);
}