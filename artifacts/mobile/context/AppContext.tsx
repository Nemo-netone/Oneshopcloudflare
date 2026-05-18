import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { CART_ITEMS } from "@/constants/data";

export type CartItem = {
  id: string;
  name: string;
  image: any;
  price: number;
  spec: string;
  qty: number;
  badge?: string;
  tags: string[];
  selected: boolean;
  originalPrice?: number;
};

export type FavoriteItem = {
  id: string;
  name: string;
  subtitle: string;
  image: any;
  price: number | null;
  priceLabel: string;
  badge: string;
  theme: string;
  themeBg: string;
};

type AppContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "qty" | "selected">) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, patch: Partial<CartItem>) => void;
  clearCart: () => void;
  cartCount: number;
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorited: (id: string) => boolean;
};

const AppContext = createContext<AppContextType | null>(null);

const CART_KEY = "@app_cart_v1";
const FAVS_KEY = "@app_favs_v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    CART_ITEMS.map((i) => ({ ...i, selected: true }))
  );
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(CART_KEY),
      AsyncStorage.getItem(FAVS_KEY),
    ])
      .then(([cartJson, favsJson]) => {
        if (cartJson) setCartItems(JSON.parse(cartJson));
        if (favsJson) setFavorites(JSON.parse(favsJson));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems)).catch(() => {});
  }, [cartItems, loaded]);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(FAVS_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const addToCart = useCallback((item: Omit<CartItem, "qty" | "selected">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1, selected: true } : i));
      }
      return [...prev, { ...item, qty: 1, selected: true }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateCartItem = useCallback((id: string, patch: Partial<CartItem>) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === item.id)) return prev.filter((f) => f.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const isFavorited = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        cartCount,
        favorites,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
