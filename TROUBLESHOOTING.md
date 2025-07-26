# 🔍 Troubleshooting Guide for Food Grading & Recommendation System

## 1. Barcode Scanning and Navigation Issues

### Symptoms
- Unable to navigate to product page after entering a barcode
- No product details displayed
- Unexpected routing behavior

### Diagnostic Steps

#### A. Verify Barcode Input
1. **Check Barcode Format**
   - Ensure the barcode is exactly 13 digits long
   - Remove any spaces or non-numeric characters
   - Example valid barcodes:
     - `4001724819906`
     - `5901234123457`
     - `7896548798765`

#### B. Console Logging Checks
Open your browser's developer tools (F12) and check the console for:
- Navigation logs
- Error messages
- Available mock product barcodes

#### C. Mock Data Verification
Confirm the mock products in `mockDataService.ts`:
```typescript
const mockProducts = [
  {
    barcode: '5901234123457', // Organic Quinoa Chips
    barcode: '4001724819906', // Dark Chocolate Bar
    barcode: '7896548798765'  // Protein Power Smoothie
]
```

### Common Solutions

#### 1. Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache and cookies

#### 2. Check React Router Configuration
- Verify routes in `App.tsx`
- Ensure `/product/:barcode` route is correctly defined

#### 3. IndexedDB Caching
- Open browser developer tools
- Go to Application > IndexedDB
- Check if products are being cached correctly

### Debugging Checklist

- [ ] Barcode is exactly 13 digits
- [ ] Console shows navigation logs
- [ ] Mock data service logs are visible
- [ ] No console errors
- [ ] Browser cache cleared
- [ ] React Router routes verified

## 2. Performance and Caching Issues

### Symptoms
- Slow product loading
- Inconsistent data retrieval
- Caching problems

### Diagnostic Steps
1. Check IndexedDB storage
2. Verify `ProductCacheDB` methods
3. Monitor network requests

## 3. Recommendation Engine Problems

### Symptoms
- No recommendations displayed
- Irrelevant product suggestions

### Diagnostic Steps
1. Verify mock recommendation logic
2. Check recommendation generation method
3. Validate product matching criteria

## 4. Internationalization Challenges

### Symptoms
- Incorrect language display
- Unit conversion errors

### Diagnostic Steps
1. Check language settings in localStorage
2. Verify translation files
3. Test unit conversion utility

## Recommended Tools

- React DevTools
- Redux DevTools
- Browser Developer Tools
- Performance Profiler

## Contact Support

If issues persist, please provide:
- Console logs
- Steps to reproduce
- Browser and version
- Operating system

---

**Pro Tip**: Always start with the simplest solution and progressively diagnose more complex issues.

## Quick Fixes Checklist

- [ ] Restart development server
- [ ] Clear browser cache
- [ ] Verify mock data
- [ ] Check console logs
- [ ] Validate routing configuration 