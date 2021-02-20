/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../actions/productsActions';
import { IProduct, IProductsContext } from '../context/productsContext';

interface IActionProducts {
  type: string;
  payload?: any;
}

const productsReducer = (state: IProductsContext, action: IActionProducts) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, productsLoading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        featuredProducts: action.payload.filter(
          (product: IProduct) => product.featured
        ),
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, productsLoading: false, productsError: true }
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, singleProductLoading: true, singleProductError: false }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, singleProductLoading: false, singleProduct: action.payload }
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, singleProductLoading: false, singleProductError: true }
    default:
      return state;
  }
};

export default productsReducer;
