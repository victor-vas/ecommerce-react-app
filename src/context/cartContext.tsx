/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions/cartActions';
import cartReducer from '../reducers/cartReducer';
import { ISingleProduct } from './productsContext';

interface CartProvideProps {
  children: ReactNode;
}

export interface ICartItem {
  id: string;
  name: string;
  color: string;
  amount: number;
  product: ISingleProduct;
  image: string;
  price: number;
  max: number;
}

export interface ICartContext {
  cart: any[];
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
  addToCart?: (
    id: string,
    color: string,
    amount: number,
    product: ISingleProduct,
  ) => void;
  removeItem?: (id: string) => void;
  toggleAmount?: (id: string, value: string) => void;
  clearCart?: () => void;
}

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') as string) || [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = createContext<ICartContext>(initialState);

export const CartProvider = ({ children }: CartProvideProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: ISingleProduct,
  ) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id: string, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
