/* eslint-disable @typescript-eslint/no-explicit-any */
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from '../actions/productsActions';
import { IInitialState } from '../context/productsContext';

interface IActionProducts {
  type: string;
  payload?: any;
}

const productsReducer = (state: IInitialState, action: IActionProducts) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    default:
      return state;
  }
};

export default productsReducer;
