/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions/cartActions';
import { ICartContext } from '../context/cartContext';

interface IActionCart {
  type: string;
  payload?: any;
}

const cartReducer = (state: ICartContext, action: IActionCart) => {
  let tempItem;
  let tempCart;
  let newItem;
  let newAmount;

  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    tempItem = state.cart.find(item => item.id === id + color);

    if (tempItem) {
      tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id + color) {
          newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return { ...cartItem, amount: newAmount };
        }

        return cartItem;
      });
    } else {
      newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    tempCart = state.cart.map(item => {
      if (item.id === id) {
        if (value === 'inc') {
          newAmount = item.amount + 1;

          if (newAmount > item.max) {
            newAmount = item.max;
          }

          return { ...item, amount: newAmount };
        }

        if (value === 'dec') {
          newAmount = item.amount - 1;

          if (newAmount < 1) {
            newAmount = 1;
          }

          return { ...item, amount: newAmount };
        }
      }

      return item;
    });
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.totalItems += amount;
        total.totalAmount += price * amount;

        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      },
    );

    return { ...state, totalItems, totalAmount };
  }

  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: tempCart || [...state.cart, newItem] };
    case REMOVE_CART_ITEM:
      tempCart = state.cart.filter(item => item.id !== action.payload);
      return { ...state, cart: tempCart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case TOGGLE_CART_ITEM_AMOUNT:
      return { ...state, cart: tempCart as any[] };
    default:
      return { ...state };
  }
};

export default cartReducer;
