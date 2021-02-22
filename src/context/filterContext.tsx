import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
  ChangeEvent,
} from 'react';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
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
  setGridView?: () => void;
  setListView?: () => void;
  updateSort?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const intialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: 'price-lowest',
};

const FilterContext = createContext<IFilterContext>(intialState);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, intialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

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

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
