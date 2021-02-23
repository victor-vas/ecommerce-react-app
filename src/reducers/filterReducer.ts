/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IFilterContext } from '../context/filterContext';
import { IProduct } from '../context/productsContext';

interface IActionFilter {
  type: string;
  payload?: any;
}

const filterReducer = (state: IFilterContext, action: IActionFilter) => {
  const { sort, filteredProducts, allProducts } = state;
  const { text, category, company, color, price, shipping } = state.filters;
  let tempProducts;
  let maxPrice;

  switch (action.type) {
    case LOAD_PRODUCTS:
      maxPrice = action.payload.map((product: IProduct) => product.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: {...state.filters, maxPrice, price: maxPrice}
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      tempProducts = [...filteredProducts];

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
    case UPDATE_FILTERS:
      return { ...state, filters: { ...state.filters, [action.payload.name]: action.payload.value } };
    case FILTER_PRODUCTS:
      tempProducts = [...allProducts];

      if(text) {
        tempProducts = tempProducts.filter(product => product.name.toLowerCase().startsWith(text));
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(product => product.category === category);
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter(product => product.company === company);
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter(product => product.colors.find(item => item === color));
      }

      tempProducts = tempProducts.filter(product => product.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter(product => product.shipping);
      }

      return { ...state, filteredProducts: tempProducts };
    case CLEAR_FILTERS:
      return { ...state, filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      }}
    default:
      return state;
  }
};

export default filterReducer;
