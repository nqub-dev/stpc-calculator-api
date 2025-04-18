export default function handler(req, res) {
  const { length, width, depth, messurmentSystem } = req.body;
  const ft3 = messurmentSystem ? (length * width * (depth / 100)) * 35.3147 : length * width * (depth / 12);
  const volume = Math.ceil(ft3);
  const bags = [
    { weight: "60lb", yield: 0.6 },
    { weight: "80lb", yield: 0.8 }
  ];

  const recommended = bags.map(b => ({
    weight: b.weight,
    count: Math.ceil(volume / b.yield),
    safetyCount: Math.ceil(volume * 1.1 / b.yield)
  }));

  const response = {
    calculatorUsed: "slab-pour",
    resultVolume: { value: volume, unit: "ft³" },
    recommendedProduct: {
      name: "High Strength Concrete Mix",
      bags: recommended
    },
    otherProducts: [
      {
        name: "Fast Setting Concrete Mix",
        bags: [
          {
            weight: "50lb",
            count: Math.ceil(volume / 0.375),
            safetyCount: Math.ceil(volume * 1.1 / 0.375)
          }
        ]
      }
    ]
  };

  res.status(200).json(response);
}