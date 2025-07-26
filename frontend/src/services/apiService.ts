import axios from 'axios';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token (if needed)
apiClient.interceptors.request.use(
  (config) => {
    // Optional: Add authentication token
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // Redirect to product not found page
          window.location.href = '/product-not-found';
          break;
        case 500:
          // Show maintenance banner
          window.location.href = '/maintenance';
          break;
        case 429: // Rate limit error
          // Implement exponential backoff
          const retryCount = error.config.__retryCount || 0;
          if (retryCount < 3) {
            error.config.__retryCount = retryCount + 1;
            const backoff = Math.pow(2, retryCount) * 1000;
            return new Promise(resolve => {
              setTimeout(() => resolve(axios(error.config)), backoff);
            });
          }
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Product-related API methods
export const ProductService = {
  // Get product details by barcode
  getProductByBarcode: async (barcode: string) => {
    try {
      const response = await apiClient.get(`/products/${barcode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get product recommendations
  getProductRecommendations: async (barcode: string) => {
    try {
      const response = await apiClient.get(`/products/${barcode}/recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  // Save scan history
  saveScanHistory: (product: any) => {
    const scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    
    // Remove duplicates and keep only last 10 items
    const updatedHistory = [
      product,
      ...scanHistory.filter((p: any) => p.barcode !== product.barcode)
    ].slice(0, 10);

    localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
  },

  // Get scan history
  getScanHistory: () => {
    return JSON.parse(localStorage.getItem('scanHistory') || '[]');
  }
};

export default apiClient;

// Ensure this is a module
export {}; 