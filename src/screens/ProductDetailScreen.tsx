import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const ProductDetailScreen = () => {
  const route = useRoute();
  const {productId} = route.params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const productData = await response.json();

      setProduct({
        id: productData.id,
        name: productData.title,
        description: productData.description,
        price: productData.price,
        imageUrl: productData.thumbnail || 'https://via.placeholder.com/200',
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const addToCart = product => {
    console.log(`Product added to cart: ${product.name}`);
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: product.imageUrl}} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(product)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#EAEAEA',
  },
  detailsContainer: {
    width: '100%',
    // paddingHorizontal: 12,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'left',
    marginBottom: 24,
  },
  addToCartButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ProductDetailScreen;
