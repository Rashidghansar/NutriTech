import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  FireIcon, 
  ShieldCheckIcon, 
  SparklesIcon 
} from '@heroicons/react/24/solid';

// Dietary Preferences
const DIETARY_PREFERENCES = [
  { id: 'vegan', label: 'Vegan', icon: HeartIcon },
  { id: 'vegetarian', label: 'Vegetarian', icon: SparklesIcon },
  { id: 'gluten-free', label: 'Gluten Free', icon: ShieldCheckIcon },
  { id: 'keto', label: 'Keto', icon: FireIcon },
  { id: 'none', label: 'No Restrictions', icon: null }
];

// Health Goals
const HEALTH_GOALS = [
  { id: 'weight-loss', label: 'Weight Loss', icon: FireIcon },
  { id: 'muscle-gain', label: 'Muscle Gain', icon: SparklesIcon },
  { id: 'heart-health', label: 'Heart Health', icon: HeartIcon },
  { id: 'energy', label: 'More Energy', icon: ShieldCheckIcon },
  { id: 'none', label: 'General Wellness', icon: null }
];

// Common Allergens
const ALLERGENS = [
  'Dairy', 
  'Eggs', 
  'Nuts', 
  'Soy', 
  'Wheat', 
  'Fish', 
  'Shellfish'
];

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const handleAllergenToggle = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen) 
        : [...prev, allergen]
    );
  };

  const handleSubmit = () => {
    // Save preferences to localStorage
    const preferences = {
      dietaryPreference,
      healthGoal,
      allergens: selectedAllergens
    };

    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Navigate to main app
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-primary">
          Personalize Your Experience
        </h1>

        {/* Dietary Preferences */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Dietary Preferences</h2>
          <div className="grid grid-cols-3 gap-4">
            {DIETARY_PREFERENCES.map((pref) => (
              <motion.button
                key={pref.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDietaryPreference(pref.id)}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center 
                  ${dietaryPreference === pref.id 
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' 
                    : 'border-gray-300 text-gray-600'}`}
              >
                {pref.icon && <pref.icon className="h-8 w-8 mb-2" />}
                <span className="text-sm font-medium">{pref.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Health Goals */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
          <div className="grid grid-cols-3 gap-4">
            {HEALTH_GOALS.map((goal) => (
              <motion.button
                key={goal.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHealthGoal(goal.id)}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center 
                  ${healthGoal === goal.id 
                    ? 'border-brand-secondary bg-brand-secondary/10 text-brand-secondary' 
                    : 'border-gray-300 text-gray-600'}`}
              >
                {goal.icon && <goal.icon className="h-8 w-8 mb-2" />}
                <span className="text-sm font-medium">{goal.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Allergens */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Allergens</h2>
          <div className="grid grid-cols-3 gap-4">
            {ALLERGENS.map((allergen) => (
              <motion.button
                key={allergen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAllergenToggle(allergen)}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center 
                  ${selectedAllergens.includes(allergen) 
                    ? 'border-rose-500 bg-rose-500/10 text-rose-500' 
                    : 'border-gray-300 text-gray-600'}`}
              >
                <span className="text-sm font-medium">{allergen}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!dietaryPreference || !healthGoal}
          className={`w-full py-3 rounded-lg text-white font-bold transition 
            ${(dietaryPreference && healthGoal) 
              ? 'bg-brand-primary hover:bg-green-600' 
              : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Start Your Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OnboardingPage; 