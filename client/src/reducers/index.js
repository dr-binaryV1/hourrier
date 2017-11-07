import {
  GET_USER,
  GET_CART_IDs,
  GET_CART_ITEMS,
  GET_SHIPPING_DETAILS,
  GET_AUTH,
  UN_AUTH,
  GET_ITINERARY,
  GET_ORDERS
} from '../actions/types';

function reducer(state = {}, action) {
  const {
    user,
    cartIds,
    cartItems,
    shippingAddresses,
    authenticated,
    travelItinerary,
    orders
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

    case GET_ORDERS:
      return { ...state, orders };

    case UN_AUTH:
      return {
        user: null,
        authenticated: false,
        cartIds: [],
        cartItems: [],
        travelItinerary: [],
        shippingAddresses: []
      };

    default:
      return state;
  }
}

export default reducer;