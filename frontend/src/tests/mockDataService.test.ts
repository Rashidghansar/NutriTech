import { MockDataService } from '../services/mockDataService';

describe('MockDataService', () => {
  describe('getProductByBarcode', () => {
    it('should retrieve GoodDay Choco Chip product by barcode', async () => {
      const product = await MockDataService.getProductByBarcode('8901063004122');
      
      expect(product).toBeTruthy();
      expect(product?.name).toBe('GoodDay Choco Chip');
      expect(product?.brand).toBe('Britannia');
      expect(product?.grade).toBe('D');
      
      // Nutrition checks
      expect(product?.nutrition.calories).toBe(493);
      expect(product?.nutrition.protein).toBe(5);
      expect(product?.nutrition.carbs).toBe(71);
      expect(product?.nutrition.fat).toBe(21);
      expect(product?.nutrition.sugars).toBe(30);
      expect(product?.nutrition.saturatedFat).toBe(7.5);
      
      // Sustainability checks
      expect(product?.sustainability.carbonFootprint).toBe(5.848);
      expect(product?.sustainability.ecoScore).toBe(32);
      
      // Additional details
      expect(product?.allergens).toContain('Gluten');
      expect(product?.labels).toContain('Vegetarian');
      expect(product?.category).toBe('Biscuits and Cakes');
      expect(product?.origin).toBe('India');

      // New field checks
      expect(product?.processingLevel).toBe(4);
      expect(product?.packaging).toBe('Plastic');
      expect(product?.nutritionGrade).toBe('unknown');
    });

    it('should retrieve GoodDay Choco Chip product by _id', async () => {
      const product = await MockDataService.getProductByBarcode('8901063004122');
      
      expect(product).toBeTruthy();
      expect(product?.name).toBe('GoodDay Choco Chip');
    });
  });

  describe('getRecommendations', () => {
    it('should generate recommendations for GoodDay Choco Chip', async () => {
      const recommendations = await MockDataService.getRecommendations('8901063004122');
      
      expect(recommendations).toBeTruthy();
      expect(recommendations.length).toBeGreaterThan(0);
      
      // Check recommendation types
      const types = recommendations.map(rec => rec.type);
      expect(types).toContain('healthier');
      expect(types).toContain('similar');
      expect(types).toContain('alternative');
    });
  });
});

export {}; // Ensure this is a module 