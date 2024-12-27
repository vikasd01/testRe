import React, {useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useProductStore} from '../store/UseProductStore';
import Card from '../components/Card';

const Products = ({navigation}) => {
  const {products, isLoading, error, fetchProducts, refreshProducts} =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Loading state UI
  if (isLoading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Error handling UI
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchProducts} />
      </View>
    );
  }

  // Product click handler
  const handleProductPress = product => {
    navigation.navigate('ProductDetailScreen', {productId: product.id});
  };

  // Empty state for no products
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No products available at the moment
        </Text>
        <Button title="Refresh" onPress={fetchProducts} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleProductPress(item)}
          style={styles.cardWrapper}>
          <Card product={item} onPress={() => handleProductPress(item)} />
        </TouchableOpacity>
      )}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      onRefresh={refreshProducts}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cardWrapper: {
    marginBottom: 16, // Card spacing
  },
});

export default Products;
