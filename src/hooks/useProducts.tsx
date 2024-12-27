import {useProductStore} from '../store/UseProductStore';

export const useProducts = () => {
  const {
    products,
    isLoading,
    error,
    hasMore,
    fetchProducts,
    refreshProducts,
    setError,
  } = useProductStore();

  return {
    products,
    isLoading,
    error,
    hasMore,
    fetchProducts,
    refreshProducts,
    setError,
  };
};
