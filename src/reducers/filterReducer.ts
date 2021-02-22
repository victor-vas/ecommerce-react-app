/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_SORT,
} from '../actions/filterActions';
import { IFilterContext } from '../context/filterContext';

interface IActionFilter {
  type: string;
  payload?: any;
}

const filterReducer = (state: IFilterContext, action: IActionFilter) => {
  const { sort, filteredProducts } = state;
  let tempProducts = [...filteredProducts];

  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return { ...state, filteredProducts: tempProducts };
    default:
      return state;
  }
};

export default filterReducer;
