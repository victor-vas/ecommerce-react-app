import React, { useContext, useEffect, useReducer } from 'react';
import productsReducer from '../reducers/productsReducer';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions/productsActions';
import { productsUrl } from '../utils/constants';

interface ProductsProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  featured?: boolean;
}

interface Small {
  url: string;
  width: number;
  height: number;
}

interface Large {
  url: string;
  width: number;
  height: number;
}

interface Full {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  small: Small;
  large: Large;
  full: Full;
}

export interface Image {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: Thumbnails;
}

export interface ISingleProduct {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  images: Image[];
  description: string;
  colors: string[];
  company: string;
  stock: number;
  stars: number;
  reviews: number;
  category: string;
  shipping: boolean;
}

export interface IProductsContext {
  isSidebarOpen: boolean;
  productsLoading: boolean;
  productsError: boolean;
  products: IProduct[];
  featuredProducts: IProduct[];
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct: ISingleProduct | null;
  openSidebar?: () => void;
  closeSidebar?: () => void;
  fetchSingleProduct?: (url: string) => Promise<void>;
}

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: null,
};

const ProductsContext = React.createContext<IProductsContext>(initialState);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url: string): Promise<void> => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await fetch(url);
      const products = await response.json();
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url: string): Promise<void> => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await fetch(url);
      const singleProduct = await response.json();
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(productsUrl);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
