/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  ChangeEvent,
} from 'react';
import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from '../actions/filterActions';
import filterReducer from '../reducers/filterReducer';
import { IProduct, useProductsContext } from './productsContext';

interface FilterProviderProps {
  children: ReactNode;
}

export interface IFilterContext {
  filteredProducts: IProduct[];
  allProducts: IProduct[];
  gridView: boolean;
  sort: string;
  filters: {
    text: string;
    company: string;
    category: string;
    color: string;
    minPrice: number;
    maxPrice: number;
    price: number;
    shipping: boolean;
  };
  setGridView?: () => void;
  setListView?: () => void;
  updateSort?: (e: ChangeEvent<HTMLSelectElement>) => void;
  updateFilters?: (e: any) => void;
  clearFilters?: () => void;
}

const intialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext<IFilterContext>(intialState);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, intialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e: any) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'category') {
      value = e.target.textContent;
    }

    if (name === 'color') {
      value = e.target.dataset.color;
    }

    if (name === 'price') {
      value = Number(value);
    }

    if (name === 'shipping') {
      value = e.target.checked;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
