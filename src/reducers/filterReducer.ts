/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOAD_PRODUCTS } from '../actions/filterActions';
import { IFilterContext } from '../context/filterContext';

interface IActionFilter {
  type: string;
  payload?: any;
}

const filterReducer = (state: IFilterContext, action: IActionFilter) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    default:
      return state;
  }
};

export default filterReducer;
