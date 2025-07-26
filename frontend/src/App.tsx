import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

// Import pages
import LandingPage from './pages/LandingPage';
import ProductDashboard from './pages/ProductDashboard';
import ScanPage from './pages/ScanPage';
import ManualScanPage from './pages/ManualScanPage';
import CategoriesPage from './pages/CategoriesPage';
import MaintenancePage from './pages/MaintenancePage';
import ProductNotFoundPage from './pages/ProductNotFoundPage';
import OnboardingPage from './pages/OnboardingPage';

// Lazy-loaded components
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));

function App() {
  const hasCompletedOnboarding = !!localStorage.getItem('userPreferences');

  return (
    <Router>
      <div className="App min-h-screen pb-16">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {!hasCompletedOnboarding && (
              <Route path="*" element={<OnboardingPage />} />
            )}
            <Route path="/" element={<LandingPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/manual-scan" element={<ManualScanPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/product/:barcode" element={<ProductDashboard />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/product-not-found" element={<ProductNotFoundPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
          
          {/* Navigation Bar */}
          <NavigationBar />
        </Suspense>
      </div>
    </Router>
  );
}

export default App; 