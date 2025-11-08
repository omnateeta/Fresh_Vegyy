import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Rider } from '../types';
import { setAuthToken } from '../services/apiClient';

type RiderState = {
  rider?: Rider;
  token?: string;
  assignedOrders: string[];
};

type Action =
  | { type: 'SET_RIDER'; payload: { rider: Rider; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'ASSIGN_ORDER'; payload: string };

const initialState: RiderState = {
  rider: undefined,
  token: undefined,
  assignedOrders: []
};

const RiderContext = createContext<{
  state: RiderState;
  setRider: (payload: { rider: Rider; token: string }) => void;
  logout: () => void;
  assignOrder: (orderId: string) => void;
}>(
  {
    state: initialState,
    setRider: () => undefined,
    logout: () => undefined,
    assignOrder: () => undefined
  }
);

const reducer = (state: RiderState, action: Action): RiderState => {
  switch (action.type) {
    case 'SET_RIDER':
      setAuthToken(action.payload.token);
      return { ...state, rider: action.payload.rider, token: action.payload.token };
    case 'LOGOUT':
      setAuthToken(undefined);
      return initialState;
    case 'ASSIGN_ORDER':
      return { ...state, assignedOrders: Array.from(new Set([...state.assignedOrders, action.payload])) };
    default:
      return state;
  }
};

export const RiderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RiderContext.Provider
      value={{
        state,
        setRider: (payload) => dispatch({ type: 'SET_RIDER', payload }),
        logout: () => dispatch({ type: 'LOGOUT' }),
        assignOrder: (orderId) => dispatch({ type: 'ASSIGN_ORDER', payload: orderId })
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};

export const useRider = () => useContext(RiderContext);

