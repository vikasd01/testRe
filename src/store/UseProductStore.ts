import { create } from 'zustand';
import { Platform, Dimensions } from 'react-native';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

interface UseProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  isTablet: boolean; 
  fetchProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  setError: (message: string) => void;
}

const fetchProductsFromAPI = async (page: number): Promise<Product[]> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const data = await response.json();
  return data.products as Product[];
};

const isDeviceTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return Platform.isPad || (width >= 600 && aspectRatio < 1.6);
};

export const useProductStore = create<UseProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  isTablet: isDeviceTablet(), 

  fetchProducts: async () => {
    const { products, page, hasMore } = get();

    if (!hasMore) return;

    set({ isLoading: true, error: null });

    try {
      const newProducts = await fetchProductsFromAPI(page);
      set({
        products: [...products, ...newProducts],
        page: page + 1,
        hasMore: newProducts.length > 0,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  refreshProducts: async () => {
    set({ isLoading: true, error: null, products: [], page: 1, hasMore: true });

    try {
      const newProducts = await fetchProductsFromAPI(1);
      set({
        products: newProducts,
        page: 2,
        hasMore: newProducts.length > 0,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setError: (message: string) => set({ error: message }),
}));
