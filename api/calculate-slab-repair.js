export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST supported" });

  const { length, width, depth, messurmentSystem = false } = req.body;
  const isMetric = messurmentSystem;
  const volume = length * width * (depth / (isMetric ? 100 : 12));
  const round = (n) => Math.round(n * 100) / 100;

  const result = {
    calculatorUsed: "slab-repair",
    resultVolume: { value: round(volume), unit: isMetric ? "m³" : "ft³" },
    recommendedProduct: {
      name: "Fast Setting Cement Patcher",
      bags: [
        {
          weight: "20lb",
          count: Math.ceil(volume / 0.2),
          safetyCount: Math.ceil(volume * 1.1 / 0.2)
        }
      ]
    },
    otherProducts: [
      {
        name: "Top 'N Bond",
        bags: [
          {
            weight: "40lb",
            count: Math.ceil(volume / 0.37),
            safetyCount: Math.ceil(volume * 1.1 / 0.37)
          }
        ]
      }
    ]
  };

  res.status(200).json(result);
}