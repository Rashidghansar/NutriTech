import React from 'react';
import { encode, decode } from 'blurhash';

// Performance Log Entry Type
interface PerformanceLogEntry {
  barcode: string;
  duration: number;
  timestamp: number;
}

// IndexedDB Wrapper for Product Caching
export const ProductCacheDB = {
  dbName: 'FoodGradingDB',
  version: 1,
  
  async openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      console.group('ProductCacheDB.openDB');
      console.log('Opening database:', this.dbName);
      
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onupgradeneeded = (event) => {
        console.log('Database upgrade needed');
        const db = request.result;
        if (!db.objectStoreNames.contains('products')) {
          console.log('Creating products object store');
          db.createObjectStore('products', { keyPath: 'barcode' });
        }
        if (!db.objectStoreNames.contains('scanHistory')) {
          console.log('Creating scanHistory object store');
          db.createObjectStore('scanHistory', { keyPath: 'timestamp' });
        }
      };
      
      request.onsuccess = () => {
        console.log('Database opened successfully');
        console.groupEnd();
        resolve(request.result);
      };
      
      request.onerror = () => {
        console.error('Error opening database:', request.error);
        console.groupEnd();
        reject(request.error);
      };
    });
  },

  async getProduct(barcode: string) {
    console.group('ProductCacheDB.getProduct');
    console.log('Searching for barcode:', barcode);
    
    try {
      const db = await this.openDB();
      return new Promise<any>((resolve, reject) => {
        const transaction = db.transaction(['products'], 'readonly');
        const store = transaction.objectStore('products');
        const request = store.get(barcode);
        
        request.onsuccess = () => {
          console.log('Product found in cache:', request.result);
          console.groupEnd();
          resolve(request.result);
        };
        
        request.onerror = () => {
          console.error('Error retrieving product:', request.error);
          console.groupEnd();
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Unexpected error in getProduct:', error);
      console.groupEnd();
      throw error;
    }
  },

  async saveProduct(product: any) {
    console.group('ProductCacheDB.saveProduct');
    console.log('Saving product:', product);
    
    try {
      const db = await this.openDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(['products'], 'readwrite');
        const store = transaction.objectStore('products');
        const request = store.put({
          ...product,
          cachedAt: new Date().getTime()
        });
        
        request.onsuccess = () => {
          console.log('Product saved successfully');
          console.groupEnd();
          resolve();
        };
        
        request.onerror = () => {
          console.error('Error saving product:', request.error);
          console.groupEnd();
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Unexpected error in saveProduct:', error);
      console.groupEnd();
      throw error;
    }
  },

  async saveScanHistory(product: any) {
    console.group('ProductCacheDB.saveScanHistory');
    console.log('Saving scan history for product:', product);
    
    try {
      const db = await this.openDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(['scanHistory'], 'readwrite');
        const store = transaction.objectStore('scanHistory');
        const request = store.add({
          ...product,
          timestamp: new Date().getTime()
        });
        
        request.onsuccess = () => {
          console.log('Scan history saved successfully');
          console.groupEnd();
          resolve();
        };
        
        request.onerror = () => {
          console.error('Error saving scan history:', request.error);
          console.groupEnd();
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Unexpected error in saveScanHistory:', error);
      console.groupEnd();
      throw error;
    }
  }
};

// BlurHash Image Placeholder Generator
export const generateBlurHash = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not create canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const blurHash = encode(imageData.data, img.width, img.height, 4, 4);
      resolve(blurHash);
    };
    img.onerror = () => reject(new Error('Image load failed'));
  });
};

// Decode BlurHash to Canvas
export const decodeBlurHash = (blurHash: string, width: number, height: number) => {
  const pixels = decode(blurHash, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return null;
  
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  
  return canvas.toDataURL();
};

// Dynamic Import Utility
export const dynamicImport = (importFn: () => Promise<any>) => {
  return React.lazy(importFn);
};

// Performance Metrics Tracker
export const PerformanceTracker = {
  trackScanPerformance(barcode: string, duration: number) {
    // Log scan performance to localStorage or send to analytics
    const performanceLog: PerformanceLogEntry[] = JSON.parse(localStorage.getItem('scanPerformance') || '[]');
    performanceLog.push({ barcode, duration, timestamp: Date.now() });
    
    // Keep only last 100 entries
    localStorage.setItem('scanPerformance', JSON.stringify(performanceLog.slice(-100)));
  },

  getScanPerformanceMetrics() {
    const performanceLog: PerformanceLogEntry[] = JSON.parse(localStorage.getItem('scanPerformance') || '[]');
    
    // Calculate average scan duration
    const avgDuration = performanceLog.length 
      ? performanceLog.reduce((sum: number, entry: PerformanceLogEntry) => sum + entry.duration, 0) / performanceLog.length 
      : 0;
    
    return {
      totalScans: performanceLog.length,
      averageScanDuration: avgDuration
    };
  }
}; 