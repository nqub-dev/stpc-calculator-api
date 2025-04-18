export default function handler(req, res) {
  const { numberOfPosts, inner, outer, depth, postShape, messurmentSystem } = req.body;
  const inchToFt = (val) => messurmentSystem ? val / 30.48 : val / 12;
  const radius = inchToFt(outer) / 2;
  const holeVolume = postShape === 'round'
    ? Math.PI * Math.pow(radius, 2) * inchToFt(depth)
    : Math.pow(inchToFt(outer), 2) * inchToFt(depth);

  const totalVolume = Math.ceil(holeVolume * numberOfPosts);
  const bags = [
    { weight: "50lb", yield: 0.375 },
    { weight: "60lb", yield: 0.6 }
  ];

  const recommended = bags.map(b => ({
    weight: b.weight,
    count: Math.ceil(totalVolume / b.yield),
    safetyCount: Math.ceil(totalVolume * 1.1 / b.yield)
  }));

  res.status(200).json({
    calculatorUsed: "post-setting",
    resultVolume: { value: totalVolume, unit: "ft³" },
    recommendedProduct: {
      name: "Fast Setting Concrete Mix",
      bags: recommended
    }
  });
}