export default function handler(req, res) {
  const { length, width, depth, messurmentSystem } = req.body;
  const ft2 = messurmentSystem ? (length * width * 10.764) : (length * width);
  const volume = Math.ceil((ft2 * depth) / 12);
  const bags = [
    { weight: "40lb", yield: 0.09 },
    { weight: "80lb", yield: 0.18 }
  ];

  const recommended = bags.map(b => ({
    weight: b.weight,
    count: Math.ceil(volume / b.yield),
    safetyCount: Math.ceil(volume * 1.1 / b.yield)
  }));

  res.status(200).json({
    calculatorUsed: "resurfacing",
    resultVolume: { value: volume, unit: "ft³" },
    recommendedProduct: {
      name: "Flo-Coat Resurfacer",
      bags: recommended
    }
  });
}