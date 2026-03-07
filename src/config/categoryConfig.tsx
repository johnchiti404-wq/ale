import React from 'react';
import { Utensils, Shirt, Wrench } from 'lucide-react';

export type OrderCategory = 'food' | 'clothes' | 'hardware';

export interface CategoryConfig {
  icon: React.ReactNode;
  emoji: string;
  labels: {
    items: string;
    itemsCapitalized: string;
    viewYourItems: string;
    addItem: string;
    itemAdded: (count: number) => string;
    yourItems: string;
    selectItemsForStop: string;
    itemSubtotal: string;
    deliveryLabel: string;
    orderType: string;
  };
}

export const categoryConfig: Record<OrderCategory, CategoryConfig> = {
  food: {
    icon: <Utensils size={18} className="text-gray-700" />,
    emoji: '🍔',
    labels: {
      items: 'food',
      itemsCapitalized: 'Food',
      viewYourItems: 'View your foodies',
      addItem: 'Add food',
      itemAdded: (count: number) => `Food added (${count})`,
      yourItems: 'Your Food',
      selectItemsForStop: 'Select Food for Stop',
      itemSubtotal: 'Food subtotal',
      deliveryLabel: 'Food delivery',
      orderType: 'food order'
    }
  },
  clothes: {
    icon: <Shirt size={18} className="text-gray-700" />,
    emoji: '👕',
    labels: {
      items: 'items',
      itemsCapitalized: 'Items',
      viewYourItems: 'View your items',
      addItem: 'Add items',
      itemAdded: (count: number) => `Items added (${count})`,
      yourItems: 'Your Items',
      selectItemsForStop: 'Select Items for Stop',
      itemSubtotal: 'Item subtotal',
      deliveryLabel: 'Clothes delivery',
      orderType: 'order'
    }
  },
  hardware: {
    icon: <Wrench size={18} className="text-gray-700" />,
    emoji: '🔧',
    labels: {
      items: 'items',
      itemsCapitalized: 'Items',
      viewYourItems: 'View your items',
      addItem: 'Add items',
      itemAdded: (count: number) => `Items added (${count})`,
      yourItems: 'Your Items',
      selectItemsForStop: 'Select Items for Stop',
      itemSubtotal: 'Item subtotal',
      deliveryLabel: 'Hardware delivery',
      orderType: 'order'
    }
  }
};

export function getCategoryConfig(category: OrderCategory): CategoryConfig {
  return categoryConfig[category];
}
