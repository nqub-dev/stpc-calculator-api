export default function handler(req, res) {
  const { length, width, depth, messurmentSystem } = req.body;
  const ft3 = messurmentSystem ? (length * width * (depth / 100)) * 35.3147 : length * width * (depth / 12);
  const volume = Math.ceil(ft3);
  const bags = [
    { weight: "20lb", yield: 0.15 },
    { weight: "40lb", yield: 0.3 }
  ];

  const recommended = bags.map(b => ({
    weight: b.weight,
    count: Math.ceil(volume / b.yield),
    safetyCount: Math.ceil(volume * 1.1 / b.yield)
  }));

  res.status(200).json({
    calculatorUsed: "slab-repair",
    resultVolume: { value: volume, unit: "ft³" },
    recommendedProduct: {
      name: "High Strength Concrete Mix",
      bags: recommended
    }
  });
}