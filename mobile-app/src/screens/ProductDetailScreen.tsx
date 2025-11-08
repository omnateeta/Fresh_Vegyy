import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Product } from '../types';
import { productApi } from '../services/productApi';
import { useCart } from '../store/CartContext';
import { theme } from '../utils/theme';

type Route = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen = () => {
  const route = useRoute<Route>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const products = await productApi.list();
      const match = products.find((item) => item.id === route.params.productId);
      setProduct(match ?? null);
    };
    void load();
  }, [route.params.productId]);

  if (!product) {
    return (
      <View style={styles.loadingState}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.imageUrl || 'https://via.placeholder.com/600x400?text=Veg' }}
        style={styles.hero}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>{product.unit}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description || 'Farm-fresh vegetable.'}</Text>
        <View style={styles.tags}>
          {product.tags?.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.cta} onPress={() => addToCart(product)}>
          <Text style={styles.ctaText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hero: {
    width: '100%',
    height: 240
  },
  content: {
    padding: theme.spacing(3)
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: 4
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: theme.spacing(2)
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: theme.spacing(2)
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3)
  },
  tag: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8
  },
  tagText: {
    color: '#fff',
    fontWeight: '500'
  },
  cta: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});


