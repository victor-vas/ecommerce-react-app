import React, { useContext, useEffect, useReducer } from 'react';
import productsReducer from '../reducers/productsReducer';
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from '../actions/productsActions';

interface ProductsProviderProps {
  children: React.ReactNode;
}

export interface IInitialState {
  isSidebarOpen: boolean;
  openSidebar?: () => void;
  closeSidebar?: () => void;
}

const initialState: IInitialState = { isSidebarOpen: false };

const ProductsContext = React.createContext<IInitialState>(initialState);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  useEffect(() => openSidebar(), []);

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
