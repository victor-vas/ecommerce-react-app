import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { LOAD_PRODUCTS } from '../actions/filterActions';
import filterReducer from '../reducers/filterReducer';
import { IProduct, useProductsContext } from './productsContext';

interface FilterProviderProps {
  children: ReactNode;
}

export interface IFilterContext {
  filteredProducts: IProduct[];
  allProducts: IProduct[];
  gridView: boolean;
}

const intialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
};

const FilterContext = createContext<IFilterContext>(intialState);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, intialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
