interface ProductResponse {
  products: {
    id: number;
    title: string;
    thumbnail: string | null;
    [key: string]: any; 
  }[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (
  limit: number = 10,
  skip: number = 0
): Promise<ProductResponse> => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    const data: ProductResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
