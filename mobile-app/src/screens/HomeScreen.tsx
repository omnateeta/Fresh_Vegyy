import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../types';
import { productApi } from '../services/productApi';
import { useCart } from '../store/CartContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../utils/theme';
import { SeasonalBanner } from '../components/SeasonalBanner';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeTabs'>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await productApi.list();
      setProducts(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <SeasonalBanner />
      <Text style={styles.title}>Fresh Picks</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadProducts} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          >
            <Image
              source={{ uri: item.imageUrl || 'https://via.placeholder.com/120x120?text=Veg' }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.unit}</Text>
              <Text style={styles.cardPrice}>₹{item.price.toFixed(2)}</Text>
              <View style={styles.cardActions}>
                <Text style={styles.badge}>Freshness {item.freshnessScore}/5</Text>
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Text style={styles.addToCart}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing(2)
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginRight: theme.spacing(2)
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600'
  },
  cardSubtitle: {
    color: theme.colors.muted,
    marginTop: 4
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  badge: {
    backgroundColor: theme.colors.success,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden'
  },
  addToCart: {
    color: theme.colors.primary,
    fontWeight: '600'
  }
});

