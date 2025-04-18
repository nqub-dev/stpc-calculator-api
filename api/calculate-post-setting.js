export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST supported" });

  const { numberOfPosts, inner, outer, depth, postShape, messurmentSystem = false } = req.body;
  const isMetric = messurmentSystem;

  let volume = 0;
  if (postShape === "round") {
    volume = ((depth * Math.PI * (Math.pow(outer / 2, 2) - Math.pow(inner / 2, 2))) /
             (isMetric ? 1000000 : 1728)) * numberOfPosts;
  } else if (postShape === "squared") {
    volume = (((Math.PI * Math.pow(outer / 2, 2) - Math.pow(inner, 2)) * depth) /
             (isMetric ? 1000000 : 1728)) * numberOfPosts;
  } else {
    return res.status(400).json({ error: "Invalid postShape" });
  }

  const round = (n) => Math.round(n * 100) / 100;

  const result = {
    calculatorUsed: "post-setting",
    resultVolume: { value: round(volume), unit: isMetric ? "m³" : "ft³" },
    recommendedProduct: {
      name: "Fast Setting Concrete Mix",
      bags: [{ weight: "50lb", count: Math.ceil(volume / 0.3) }]
    },
    otherProducts: [
      {
        name: "5000 Plus Concrete Mix",
        bags: [{ weight: "80lb", count: Math.ceil(volume / 0.6) }]
      }
    ]
  };

  res.status(200).json(result);
}