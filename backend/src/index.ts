import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock product data generator
const generateMockProduct = (barcode: string) => {
  const productNames = [
    'Organic Quinoa', 
    'Green Smoothie', 
    'Whole Wheat Bread', 
    'Protein Bar', 
    'Almond Milk'
  ];
  const brands = [
    'Healthy Foods Co.', 
    'Nutrition Plus', 
    'Organic Harvest', 
    'Fitness Fuel', 
    'Nature\'s Best'
  ];
  const grades = ['A', 'B', 'C', 'D', 'F'];

  const randomIndex = parseInt(barcode.slice(-1)) % productNames.length;

  return {
    barcode,
    name: productNames[randomIndex],
    brand: brands[randomIndex],
    grade: grades[Math.floor(Math.random() * grades.length)],
    nutrition: {
      calories: Math.floor(Math.random() * 300) + 100,
      protein: Math.floor(Math.random() * 20) + 5,
      carbs: Math.floor(Math.random() * 30) + 10,
      fat: Math.floor(Math.random() * 15) + 3
    },
    qualityScores: {
      'Nutritional Value': Math.floor(Math.random() * 80) + 20,
      'Ingredient Quality': Math.floor(Math.random() * 80) + 20,
      'Sustainability': Math.floor(Math.random() * 80) + 20,
      'Health Impact': Math.floor(Math.random() * 80) + 20
    }
  };
};

// Mock recommendations generator
const generateMockRecommendations = (barcode: string) => {
  const recommendationTypes = [
    { 
      type: 'Healthier Alternative', 
      reasons: [
        'Lower sugar content', 
        'More protein', 
        'Less processed ingredients'
      ]
    },
    { 
      type: 'Similar Product', 
      reasons: [
        'Same category, higher grade', 
        'Better nutritional profile', 
        'More sustainable'
      ]
    },
    { 
      type: 'Recipe Suggestion', 
      reasons: [
        'Great for meal prep', 
        'Versatile ingredient', 
        'Nutritious option'
      ]
    }
  ];

  return [1, 2, 3].map((_, index) => {
    const typeIndex = (parseInt(barcode.slice(-1)) + index) % recommendationTypes.length;
    const type = recommendationTypes[typeIndex];
    
    return {
      id: `rec_${barcode}_${index}`,
      name: `${type.type} Product ${index + 1}`,
      grade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      reason: type.reasons[Math.floor(Math.random() * type.reasons.length)]
    };
  });
};

// Product details endpoint
app.get('/api/products/:barcode', (req, res) => {
  const { barcode } = req.params;
  
  try {
    // Validate barcode (basic 13-digit check)
    if (!/^\d{13}$/.test(barcode)) {
      return res.status(400).json({ error: 'Invalid barcode format' });
    }

    const product = generateMockProduct(barcode);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Product recommendations endpoint
app.get('/api/products/:barcode/recommendations', (req, res) => {
  const { barcode } = req.params;
  
  try {
    // Validate barcode (basic 13-digit check)
    if (!/^\d{13}$/.test(barcode)) {
      return res.status(400).json({ error: 'Invalid barcode format' });
    }

    const recommendations = generateMockRecommendations(barcode);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Food Grading & Recommendation System Backend');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 