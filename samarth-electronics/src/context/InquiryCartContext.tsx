"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface InquiryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  categoryName?: string;
  variantId?: string;
  variantLabel?: string;
  image?: string;
  quantity: number;
}

interface InquiryCartContextType {
  items: InquiryItem[];
  itemCount: number;
  totalQuantity: number;
  isOpen: boolean;
  addItem: (item: Omit<InquiryItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const InquiryCartContext = createContext<InquiryCartContextType | undefined>(undefined);

const STORAGE_KEY = "samarth_inquiry_cart_v1";

export function InquiryCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load inquiry cart from storage", e);
    }
    setMounted(true);
  }, []);

  // Sync to localStorage on update
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist inquiry cart to storage", e);
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<InquiryItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity && newItem.quantity > 0 ? newItem.quantity : 1;

    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });

    // Auto-open drawer when user adds an item so they get immediate visual feedback
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, 9999) } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const itemCount = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <InquiryCartContext.Provider
      value={{
        items,
        itemCount,
        totalQuantity,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </InquiryCartContext.Provider>
  );
}

export function useInquiryCart() {
  const context = useContext(InquiryCartContext);
  if (!context) {
    throw new Error("useInquiryCart must be used within an InquiryCartProvider");
  }
  return context;
}

