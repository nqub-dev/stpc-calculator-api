export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST supported" });

  const { length, width, depth, messurmentSystem = false } = req.body;
  const isMetric = messurmentSystem;
  const volume = length * width * (depth / (isMetric ? 100 : 12));
  const round = (n) => Math.round(n * 100) / 100;

  const result = {
    calculatorUsed: "slab-pour",
    resultVolume: { value: round(volume), unit: isMetric ? "m³" : "ft³" },
    recommendedProduct: {
      name: "High Strength Concrete Mix",
      bags: [
        { weight: "60lb", count: Math.ceil(volume / 0.45) },
        { weight: "80lb", count: Math.ceil(volume / 0.6) }
      ]
    },
    otherProducts: [
      {
        name: "Fast Setting Concrete Mix",
        bags: [{ weight: "50lb", count: Math.ceil(volume / 0.3) }]
      }
    ]
  };

  res.status(200).json(result);
}