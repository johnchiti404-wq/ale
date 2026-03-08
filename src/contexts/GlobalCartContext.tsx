import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { OrderCategory } from '../config/categoryConfig';

export interface GlobalCartItem {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  image: string;
  price: number;
  category: OrderCategory;
}

interface GlobalCartContextType {
  cart: GlobalCartItem[];
  addToCart: (item: GlobalCartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getOrderCategory: () => OrderCategory | null;
}

const GlobalCartContext = createContext<GlobalCartContextType | undefined>(undefined);

const STORAGE_KEY = 'GLOBAL_CART';

export const GlobalCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<GlobalCartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((item: any) => ({
          ...item,
          category: item.category || 'food'
        }));
      } catch (error) {
        console.error('Error loading cart:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    console.log('🛒 Global cart updated:', cart.length);
  }, [cart]);

  const addToCart = useCallback((item: GlobalCartItem) => {
    setCart(prev => [...prev, item]);
    console.log('✅ Added to cart:', item.name);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    console.log('❌ Removed from cart:', itemId);
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Cart cleared');
  }, []);

  const getCartCount = useCallback(() => {
    return cart.length;
  }, [cart]);

  const getOrderCategory = useCallback((): OrderCategory | null => {
    if (cart.length === 0) return null;
    return cart[0].category;
  }, [cart]);

  const value: GlobalCartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    getOrderCategory
  };

  return (
    <GlobalCartContext.Provider value={value}>
      {children}
    </GlobalCartContext.Provider>
  );
};

export const useGlobalCart = () => {
  const context = useContext(GlobalCartContext);
  if (context === undefined) {
    throw new Error('useGlobalCart must be used within GlobalCartProvider');
  }
  return context;
};
