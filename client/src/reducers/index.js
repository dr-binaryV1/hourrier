import {
  GET_USER,
  GET_CART_IDs,
  GET_CART_ITEMS,
  GET_SHIPPING_DETAILS,
  GET_AUTH,
  GET_ITINERARY
} from '../actions/types';

function reducer(state = {}, action) {
  const {
    user,
    cartIds,
    cartItems,
    shippingAddresses,
    authenticated,
    travelItinerary
  } = action;

  switch(action.type) {
    case GET_USER:
      return { ...state, user };

    case GET_AUTH:
      return { ...state, authenticated };

    case GET_CART_IDs:
      return { ...state, cartIds };

    case GET_CART_ITEMS:
      return { ...state, cartItems };

    case GET_ITINERARY:
      return { ...state, travelItinerary };

    case GET_SHIPPING_DETAILS:
      return { ...state, shippingAddresses };

    default:
      return state;
  }
}

export default reducer;