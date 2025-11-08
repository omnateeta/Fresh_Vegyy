import React, { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';
import { Product } from '../types';

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE'; payload: { productId: string } }
  | { type: 'CLEAR' };

const initialState: CartState = { items: [] };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
}>({
  state: initialState,
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  clearCart: () => undefined,
  total: 0
});

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.payload.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity ?? 1) }
              : item
          )
        };
      }
      return {
        items: [...state.items, { ...action.payload.product, quantity: action.payload.quantity ?? 1 }]
      };
    }

    case 'REMOVE':
      return { items: state.items.filter((item) => item.id !== action.payload.productId) };

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const total = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      state,
      total,
      addToCart: (product: Product, quantity = 1) =>
        dispatch({ type: 'ADD', payload: { product, quantity } }),
      removeFromCart: (productId: string) => dispatch({ type: 'REMOVE', payload: { productId } }),
      clearCart: () => dispatch({ type: 'CLEAR' })
    }),
    [state, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


