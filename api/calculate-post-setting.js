export default function handler(req, res) {
  const { numberOfPosts, inner, outer, depth, postShape, messurmentSystem = false } = req.body;
  const isMetric = messurmentSystem;

  let volume = 0;
  const convert = (val) => isMetric ? val : val * 2.54; // always work in cm internally

  const outerCm = convert(outer);
  const innerCm = convert(inner);
  const depthCm = convert(depth);

  if (postShape === "round") {
    volume = ((depthCm * Math.PI * (Math.pow(outerCm / 2, 2) - Math.pow(innerCm / 2, 2))) / 1000) * numberOfPosts;
  } else if (postShape === "squared") {
    volume = (((outerCm ** 2 - innerCm ** 2) * depthCm) / 1000) * numberOfPosts;
  } else {
    return res.status(400).json({ error: "Invalid postShape" });
  }

  // Convert to ft³ if imperial
  const finalVolume = isMetric ? volume / 0.0283168 : volume / 28.3168;

  const round = (n) => Math.round(n * 100) / 100;

  const result = {
    calculatorUsed: "post-setting",
    resultVolume: { value: round(finalVolume), unit: "ft³" },
    recommendedProduct: {
      name: "Fast Setting Concrete Mix",
      bags: [
        {
          weight: "50lb",
          count: Math.ceil(finalVolume / 0.3),
          safetyCount: Math.ceil(finalVolume * 1.1 / 0.3)
        }
      ]
    },
    otherProducts: [
      {
        name: "5000 Plus Concrete Mix",
        bags: [
          {
            weight: "80lb",
            count: Math.ceil(finalVolume / 0.6),
            safetyCount: Math.ceil(finalVolume * 1.1 / 0.6)
          }
        ]
      }
    ]
  };

  res.status(200).json(result);
}