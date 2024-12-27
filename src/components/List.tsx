import React, {useEffect} from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import {useProducts} from './hooks/useProducts';

const List = () => {
  const {products, isLoading, error, hasMore, fetchProducts, refreshProducts} =
    useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({item}) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" />}
      {error && <Text style={{color: 'red'}}>{error}</Text>}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          if (hasMore && !isLoading) {
            fetchProducts();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={refreshProducts}
      />

      <Button title="Refresh Products" onPress={refreshProducts} />
    </View>
  );
};

export default List;
