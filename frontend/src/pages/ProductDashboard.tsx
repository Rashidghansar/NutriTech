import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  ChartBarIcon,
  MapPinIcon,
  TagIcon,
  CubeIcon,
  HomeIcon,
  QueueListIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MockDataService, Product, Recommendation } from '../services/mockDataService';

const ProductDashboard: React.FC = () => {
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      console.group('ProductDashboard.fetchProductData');
      console.log('Barcode from URL params:', barcode);
      
      // Always set loading to true at the start of the fetch
      setIsLoading(true);
      setError(null);

      if (!barcode) {
        console.error('No barcode provided');
        setError('No barcode provided');
        setIsLoading(false);
        navigate('/product-not-found', { 
          state: { 
            message: 'No barcode was specified',
            suggestedAction: 'Please enter a valid barcode'
          } 
        });
        console.groupEnd();
        return;
      }

      try {
        // Fetch product details
        const fetchedProduct = await MockDataService.getProductByBarcode(barcode);
        
        if (!fetchedProduct) {
          console.error(`No product found for barcode: ${barcode}`);
          setError('Product not found');
          setIsLoading(false);
          navigate('/product-not-found', { 
            state: { 
              message: `No product found for barcode: ${barcode}`,
              suggestedAction: 'Try another barcode or browse categories'
            } 
          });
          console.groupEnd();
          return;
        }

        console.log('Product found:', fetchedProduct);
        setProduct(fetchedProduct);

        // Fetch recommendations
        const productRecommendations = await MockDataService.getRecommendations(barcode);
        console.log('Recommendations:', productRecommendations);
        setRecommendations(productRecommendations);

        // Get current favorites
        const currentFavorites = MockDataService.getFavorites();
        setFavorites(currentFavorites);

        // Ensure loading is set to false after all async operations
        setIsLoading(false);
        console.groupEnd();
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('An unexpected error occurred');
        setIsLoading(false);
        navigate('/product-not-found', { 
          state: { 
            message: 'An unexpected error occurred while fetching product details',
            suggestedAction: 'Please try again later'
          } 
        });
        console.groupEnd();
      }
    };

    fetchProductData();
  }, [barcode, navigate]);

  const toggleFavorite = () => {
    if (!product) return;
    const updatedFavorites = MockDataService.toggleFavorite(product);
    setFavorites(updatedFavorites);
  };

  const isFavorite = product 
    ? favorites.some(fav => fav.barcode === product.barcode) 
    : false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse text-2xl text-brand-primary mb-4">
            Loading Product Details...
          </div>
          <div className="text-gray-600">
            Fetching product information for barcode: {barcode}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-red-500">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  // Nutrition chart data
  const nutritionData = [
    { name: 'Protein', value: product.nutrition.protein },
    { name: 'Carbs', value: product.nutrition.carbs },
    { name: 'Fat', value: product.nutrition.fat }
  ];

  // Sustainability chart data
  const sustainabilityData = [
    { name: 'Carbon Footprint', value: product.sustainability.carbonFootprint },
    { name: 'Packaging Score', value: product.sustainability.packagingScore },
    { name: 'Water Usage', value: product.sustainability.waterUsage }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto max-w-4xl px-4 py-3 flex justify-between items-center">
          {/* Back/Home Button */}
          <Link 
            to="/" 
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300 p-2 rounded-full hover:bg-brand-primary/10"
            aria-label="Home"
          >
            <HomeIcon className="h-6 w-6" />
          </Link>

          {/* Scan Button */}
          <Link 
            to="/scan" 
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300 p-2 rounded-full hover:bg-brand-primary/10"
            aria-label="Scan Product"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>

          {/* Categories Button */}
          <Link 
            to="/categories" 
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300 p-2 rounded-full hover:bg-brand-primary/10"
            aria-label="Browse Categories"
          >
            <QueueListIcon className="h-6 w-6" />
          </Link>

          {/* Profile Button */}
          <Link 
            to="/profile" 
            className="text-gray-600 hover:text-brand-primary transition-colors duration-300 p-2 rounded-full hover:bg-brand-primary/10"
            aria-label="User Profile"
          >
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Main Content with Top Padding */}
      <div className="container mx-auto max-w-4xl pt-16">
        {/* Product Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-brand-primary">{product.name}</h1>
            <p className="text-xl text-gray-600">{product.brand}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div 
              className={`text-3xl font-bold ${
                product.grade === 'A' ? 'text-green-600' : 
                product.grade === 'B' ? 'text-yellow-600' : 
                'text-red-600'
              }`}
            >
              {product.grade}
            </div>
            <button 
              onClick={toggleFavorite}
              className="text-red-500 hover:text-red-700 transition"
            >
              <HeartIcon 
                className={`h-8 w-8 ${isFavorite ? 'fill-current' : 'stroke-current'}`} 
              />
            </button>
          </div>
        </motion.div>

        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white shadow-md rounded-lg overflow-hidden mb-8"
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              className="w-full h-96 object-cover"
              alt={product.name}
              onLoad={() => console.log('Image loaded successfully:', product.imageUrl)}
              onError={(e) => {
                console.error('Image load failed:', {
                  imageUrl: product.imageUrl,
                  currentSrc: e.currentTarget.src,
                  fullProductDetails: product
                });

                // Fallback image paths to try
                const fallbackImages = [
                  '/src/assets/images/default-product.jpg',
                  '/assets/images/default-product.jpg',
                  process.env.PUBLIC_URL + '/src/assets/images/default-product.jpg',
                  process.env.PUBLIC_URL + '/default-product.jpg'
                ];
                
                fallbackImages.forEach(fallbackSrc => {
                  console.log(`Attempting fallback image: ${fallbackSrc}`);
                  const img = new Image();
                  img.onload = () => {
                    console.log(`Fallback image loaded: ${fallbackSrc}`);
                    e.currentTarget.src = fallbackSrc;
                  };
                  img.onerror = () => {
                    console.error(`Failed to load fallback image: ${fallbackSrc}`);
                  };
                  img.src = fallbackSrc;
                });
              }}
            />
          ) : (
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </motion.div>

        {/* Nutrition & Sustainability */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Nutrition Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-brand-primary" />
              Nutrition Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Sustainability Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <SparklesIcon className="h-6 w-6 mr-2 text-green-600" />
              Sustainability Metrics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sustainabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Ingredients & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-600" />
              Ingredients
            </h2>
            <ul className="list-disc list-inside">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </motion.div>

          {/* Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className="mb-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => navigate(`/product/${rec.product.barcode}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{rec.product.name}</h3>
                      <p className="text-sm text-gray-600">{rec.reason}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded text-xs font-bold
                      ${rec.type === 'healthier' ? 'bg-green-200 text-green-800' : 
                        rec.type === 'similar' ? 'bg-blue-200 text-blue-800' : 
                        'bg-yellow-200 text-yellow-800'}
                    `}>
                      {rec.type}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No recommendations available</p>
            )}
          </motion.div>
        </div>

        {/* Additional Product Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Origin and Category */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-brand-primary">Origin & Category</h3>
              <div className="space-y-2">
                {product.origin && (
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-red-500" />
                    <span>{product.origin}</span>
                  </div>
                )}
                {product.category && (
                  <div className="flex items-center">
                    <TagIcon className="h-5 w-5 mr-2 text-green-500" />
                    <span>{product.category}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Labels and Allergens */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-brand-primary">Labels & Warnings</h3>
              <div className="space-y-2">
                {product.labels && product.labels.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Labels:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.labels.map((label, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.allergens && product.allergens.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Allergen Warnings:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen, index) => (
                        <span 
                          key={index} 
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Eco Score and Sustainability Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SparklesIcon className="h-6 w-6 mr-2 text-green-600" />
            Sustainability Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-brand-primary">Eco Score</h3>
              <div className="flex items-center">
                <div 
                  className={`text-4xl font-bold mr-4 ${
                    product.sustainability.ecoScore >= 80 ? 'text-green-600' : 
                    product.sustainability.ecoScore >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}
                >
                  {product.sustainability.ecoScore}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {product.sustainability.ecoScore >= 80 ? 'Excellent' : 
                     product.sustainability.ecoScore >= 60 ? 'Good' : 
                     'Needs Improvement'}
                  </p>
                  <p className="text-xs text-gray-500">Environmental Impact</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-brand-primary">Carbon Footprint</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-4 text-blue-600">
                  {product.sustainability.carbonFootprint.toFixed(2)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">CO₂e/kg</p>
                  <p className="text-xs text-gray-500">Greenhouse Gas Emissions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Processing Level and Packaging */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg p-6 mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <CubeIcon className="h-6 w-6 mr-2 text-blue-600" />
              Product Processing & Packaging
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Processing Level */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-brand-primary">Processing Level</h3>
                <div className="flex items-center">
                  <div 
                    className={`text-4xl font-bold mr-4 ${
                      product.processingLevel === 1 ? 'text-green-600' : 
                      product.processingLevel === 2 ? 'text-yellow-600' : 
                      product.processingLevel === 3 ? 'text-orange-600' : 
                      'text-red-600'
                    }`}
                  >
                    {product.processingLevel}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {product.processingLevel === 1 ? 'Unprocessed' : 
                       product.processingLevel === 2 ? 'Minimally Processed' : 
                       product.processingLevel === 3 ? 'Processed' : 
                       'Ultra-Processed'}
                    </p>
                    <p className="text-xs text-gray-500">NOVA Food Classification</p>
                  </div>
                </div>
              </div>

              {/* Packaging */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-brand-primary">Packaging</h3>
                <div className="flex items-center">
                  <div className="text-3xl font-bold mr-4 text-blue-600">
                    {product.packaging || 'N/A'}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Packaging Material</p>
                    <p className="text-xs text-gray-500">Environmental Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default ProductDashboard; 