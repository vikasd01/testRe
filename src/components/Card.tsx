import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Product {
  id: number;
  title: string;
  thumbnail: string | null;
  price: string | number; // Added price to Product interface
}

interface CardProps {
  product: Product;
  onPress: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({product, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {product.thumbnail ? (
        <Image
          source={{uri: product.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
          onLoadStart={() => console.log('Loading image...')}
          onError={() => console.log('Failed to load image.')}
        />
      ) : (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={80} height={80} borderRadius={8} />
        </SkeletonPlaceholder>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
  },
});

export default Card;
