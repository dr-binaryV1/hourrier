import {
  GET_USER,
  GET_CART_IDs,
  GET_CART_ITEMS
} from '../actions/types';

function reducer(state = {}, action) {
  const { user, cartIds, cartItems } = action;

  switch(action.type) {
    case GET_USER:
      return { ...state, user };

    case GET_CART_IDs:
      return { ...state, cartIds };

    case GET_CART_ITEMS:
      return { ...state, cartItems };

    default:
      return state;
  }
}

export default reducer;