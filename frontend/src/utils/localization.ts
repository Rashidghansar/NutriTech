import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language Resources
const resources = {
  en: {
    translation: {
      // Common
      'app.title': 'Food Grading & Recommendation System',
      'app.tagline': 'Instant food insights at your fingertips',
      
      // Onboarding
      'onboarding.title': 'Personalize Your Experience',
      'onboarding.dietary_preferences': 'Dietary Preferences',
      'onboarding.health_goals': 'Health Goals',
      'onboarding.allergens': 'Allergens',
      
      // Product Dashboard
      'product.grade': '{{grade}} Grade',
      'product.nutrition.calories': 'This product contains {{calories}} calories. Consider portion control.',
      'product.nutrition.protein': 'Protein content: {{protein}}g. Great for muscle recovery!',
      
      // Sustainability
      'sustainability.carbon_footprint': 'Carbon Footprint',
      'sustainability.packaging_score': 'Packaging Score',
      'sustainability.water_usage': 'Water Usage',
      
      // Recommendations
      'recommendations.title': 'Recommendations',
      
      // Errors
      'error.product_not_found': 'Product not found',
      'error.camera_access': 'Unable to access camera. Please check permissions.'
    }
  },
  es: {
    translation: {
      // Spanish translations
      'app.title': 'Sistema de Calificación y Recomendación de Alimentos',
      'app.tagline': 'Información instantánea de alimentos en tus manos',
      
      // Add more Spanish translations...
    }
  },
  fr: {
    translation: {
      // French translations
      'app.title': 'Système de Notation et de Recommandation Alimentaire',
      'app.tagline': 'Informations alimentaires instantanées à portée de main',
      
      // Add more French translations...
    }
  }
};

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Utility for dynamic unit conversion
export const convertUnits = (value: number, fromUnit: string, toUnit: string) => {
  // Basic unit conversion logic
  const conversions: Record<string, (val: number) => number> = {
    // Calories
    'kcal_to_kJ': (val: number) => val * 4.184,
    'kJ_to_kcal': (val: number) => val / 4.184,
    
    // Weight
    'g_to_oz': (val: number) => val * 0.035274,
    'oz_to_g': (val: number) => val / 0.035274,
    
    // Volume
    'ml_to_fl_oz': (val: number) => val * 0.033814,
    'fl_oz_to_ml': (val: number) => val / 0.033814
  };

  const conversionKey = `${fromUnit}_to_${toUnit}`;
  const conversionFn = conversions[conversionKey];
  
  return conversionFn ? conversionFn(value) : value;
};

// Language switcher utility
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};

export {}; // Ensure this is a module 