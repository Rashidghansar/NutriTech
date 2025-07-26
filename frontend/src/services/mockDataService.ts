import { ProductCacheDB } from '../utils/performanceUtils';

// Types for mock data
export interface Product {
  barcode: string;
  _id?: string;
  name: string;
  brand: string;
  grade: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugars: number;
    saturatedFat: number;
  };
  ingredients: string[];
  sustainability: {
    carbonFootprint: number;
    packagingScore: number;
    waterUsage: number;
    ecoScore: number;
  };
  imageUrl?: string;
  allergens?: string[];
  labels?: string[];
  category?: string;
  origin?: string;
  processingLevel?: number;
  packaging?: string;
  nutritionGrade?: string;
}

export interface Recommendation {
  type: 'healthier' | 'similar' | 'alternative';
  product: Product;
  reason: string;
}

const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/src/assets/images/default-product.jpg';

// Mock product database
const mockProducts: Product[] = [
  {
    barcode: '5901234123457',
    name: 'Organic Quinoa Chips',
    brand: 'HealthySnacks Co.',
    grade: 'A',
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 15,
      fat: 5,
      sugars: 2,
      saturatedFat: 1
    },
    ingredients: ['Quinoa', 'Sea Salt', 'Olive Oil'],
    sustainability: {
      carbonFootprint: 0.5,
      packagingScore: 4,
      waterUsage: 20,
      ecoScore: 80
    },
    imageUrl: DEFAULT_IMAGE
  },
  {
    barcode: '4001724819906',
    name: 'Dark Chocolate Bar',
    brand: 'Pure Indulgence',
    grade: 'B',
    nutrition: {
      calories: 180,
      protein: 2,
      carbs: 20,
      fat: 12,
      sugars: 15,
      saturatedFat: 7
    },
    ingredients: ['Cocoa Mass', 'Sugar', 'Cocoa Butter'],
    sustainability: {
      carbonFootprint: 1.2,
      packagingScore: 3,
      waterUsage: 45,
      ecoScore: 60
    },
    imageUrl: DEFAULT_IMAGE
  },
  {
    barcode: '7896548798765',
    name: 'Protein Power Smoothie',
    brand: 'FitDrink',
    grade: 'A-',
    nutrition: {
      calories: 150,
      protein: 20,
      carbs: 10,
      fat: 3,
      sugars: 5,
      saturatedFat: 1
    },
    ingredients: ['Whey Protein', 'Banana', 'Almond Milk'],
    sustainability: {
      carbonFootprint: 0.8,
      packagingScore: 4,
      waterUsage: 35,
      ecoScore: 75
    },
    imageUrl: DEFAULT_IMAGE
  },
  {
    barcode: '8901063004122',
    _id: '8901063004122',
    name: 'GoodDay Choco Chip',
    brand: 'Britannia',
    grade: 'D',
    nutrition: {
      calories: 493,
      protein: 5,
      carbs: 71,
      fat: 21,
      sugars: 30,
      saturatedFat: 7.5
    },
    ingredients: [
      'Refined Wheat Flour', 
      'Sugar', 
      'Edible Vegetable Oil (Palm)', 
      'Chocolate Chips', 
      'Cocoa Solids', 
      'Dextrose', 
      'Emulsifiers', 
      'Salt', 
      'Natural and Artificial Flavors'
    ],
    sustainability: {
      carbonFootprint: 5.848,
      packagingScore: 3,
      waterUsage: 45,
      ecoScore: 32
    },
    imageUrl: DEFAULT_IMAGE,
    allergens: ['Gluten'],
    labels: ['Vegetarian', 'Green Dot India'],
    category: 'Biscuits and Cakes',
    origin: 'India',
    processingLevel: 4,  // From nova_group
    packaging: 'Plastic',
    nutritionGrade: 'unknown'
  }
];

export const MockDataService = {
  async getProductByBarcode(barcode: string): Promise<Product | null> {
    console.group('MockDataService.getProductByBarcode');
    console.log('Input barcode:', barcode);
    console.log('Available barcodes:', mockProducts.map(p => p.barcode));

    // Ensure barcode is a string and trim any whitespace
    const sanitizedBarcode = String(barcode).trim();

    try {
      // First, check IndexedDB cache
      const cachedProduct = await ProductCacheDB.getProduct(sanitizedBarcode);
      if (cachedProduct) {
        console.log('Found in cache:', cachedProduct);
        console.groupEnd();
        return cachedProduct;
      }

      // If not in cache, find in mock products
      const product = mockProducts.find(p => 
        p.barcode === sanitizedBarcode || p._id === sanitizedBarcode
      );
      
      if (product) {
        console.log('Found in mock products:', product);
        // Save to cache
        await ProductCacheDB.saveProduct(product);
        await ProductCacheDB.saveScanHistory(product);
        console.groupEnd();
        return product;
      }
      
      console.error('No product found for barcode:', sanitizedBarcode);
      console.log('Detailed mock products:', JSON.stringify(mockProducts, null, 2));
      console.groupEnd();
      return null;
    } catch (error) {
      console.error('Error in getProductByBarcode:', error);
      console.groupEnd();
      throw error;
    }
  },

  async getRecommendations(barcode: string): Promise<Recommendation[]> {
    console.group('MockDataService.getRecommendations');
    console.log('Fetching recommendations for barcode:', barcode);

    try {
      const product = await this.getProductByBarcode(barcode);
      
      if (!product) {
        console.log('No product found for recommendations');
        console.groupEnd();
        return [];
      }

      // Generate mock recommendations based on the product
      const recommendations: Recommendation[] = [
        {
          type: 'healthier',
          product: mockProducts[0], // Quinoa Chips
          reason: 'Lower calories and higher nutritional value'
        },
        {
          type: 'similar',
          product: mockProducts[2], // Protein Smoothie
          reason: 'Similar protein content and health-focused brand'
        },
        {
          type: 'alternative',
          product: mockProducts[1], // Dark Chocolate
          reason: 'Indulgent option with potential antioxidant benefits'
        }
      ];

      console.log('Generated recommendations:', recommendations);
      console.groupEnd();
      return recommendations;
    } catch (error) {
      console.error('Error in getRecommendations:', error);
      console.groupEnd();
      throw error;
    }
  },

  // Simulate user preferences
  getUserPreferences() {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) return JSON.parse(storedPreferences);

    // Default preferences
    const defaultPreferences = {
      dietaryPreference: 'Balanced',
      healthGoal: 'Weight Management',
      allergens: []
    };

    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    return defaultPreferences;
  },

  // Simulate favorites management
  getFavorites(): Product[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  },

  toggleFavorite(product: Product) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(f => f.barcode === product.barcode);

    if (index !== -1) {
      // Remove from favorites
      favorites.splice(index, 1);
    } else {
      // Add to favorites
      favorites.push(product);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  }
};

// Ensure this is a module
export {}; 