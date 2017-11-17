import {
  GET_USER,
  GET_CART_IDs,
  GET_CART_ITEMS,
  GET_SHIPPING_DETAILS,
  GET_AUTH,
  GET_ITINERARY,
  UN_AUTH,
  GET_ORDERS
} from './types';
import {
  getUser,
  updateUser,
  updateProduct,
  addShipping,
  acceptPackage,
  deleteShippingAddress,
  deleteTravelItinerary,
  updateTravelerStatus,
  addItemToCart,
  getCart,
  getItems,
  deleteItem,
  checkout,
  getShipping,
  submitSignIn,
  changePrimaryShipping,
  addItinerary,
  getItinerary,
  getOrders,
  deleteOneNotification,
  deleteAllNotifications
} from '../helpers/api';

export const receive_user = user => {
  return {
    type: GET_USER,
    user
  }
}

export const receive_cart_ids = cartIds => {
  return {
    type: GET_CART_IDs,
    cartIds
  }
}

export const receive_cart_items = cartItems => {
  return {
    type: GET_CART_ITEMS,
    cartItems
  }
}

export const receive_shipping_details = shippingAddresses => {
  return {
    type: GET_SHIPPING_DETAILS,
    shippingAddresses
  }
}

export const receive_travel_itinerary = travelItinerary => {
  return {
    type: GET_ITINERARY,
    travelItinerary
  }
}

export const get_authenticated_state = (authenticated) => {
  return {
    type: GET_AUTH,
    authenticated
  }
}

export const receive_orders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const un_auth = () => {
  return {
    type: UN_AUTH
  }
}

export const get_user = () => dispatch => {
  getUser()
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const update_user = newUser => dispatch => {
  updateUser(newUser)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const add_shipping_address = shippingAddress => dispatch => {
  addShipping(shippingAddress)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
    dispatch(receive_shipping_details(res.addresses));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
  });
}

export const delete_shipping_address = shippingAddressId => dispatch => {
  deleteShippingAddress(shippingAddressId)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
    dispatch(receive_shipping_details(res.addresses));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const add_travel_itinerary = itinerary => dispatch => {
  addItinerary(itinerary)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
    dispatch(receive_travel_itinerary(res.itineraries));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
  });
}

export const get_itinerary_details = itineraryIds => dispatch => {
  getItinerary(itineraryIds)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_travel_itinerary(res.travelItinerary));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const delete_travel_itinerary = itineraryId => dispatch => {
  deleteTravelItinerary(itineraryId)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
    dispatch(receive_travel_itinerary(res.itineraries));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const update_traveler_status = status => dispatch => {
  updateTravelerStatus(status)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const get_shopping_cart = () => dispatch => {
  getCart()
  .then(res => res.json())
  .then(res => {
    dispatch(receive_cart_ids(res.itemIds));

    getItems({ itemIds: res.itemIds })
    .then(res => res.json())
    .then(res => {
      dispatch(receive_cart_items(res.items));
    })
    .catch(err => console.log(`Error reported: ${err}`));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const delete_shoppingcart_item = id => dispatch => {
  deleteItem({itemId: id})
  .then(res => res.json())
  .then(res => {
    getItems({ itemIds: res })
    .then(res => res.json())
    .then(res => {
      const itemsId = res.items.map(item => {return item._id});
      dispatch(receive_cart_items(res.items));
      dispatch(receive_cart_ids(itemsId));
    })
    .catch(err => console.log(`Error reported: ${err}`));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
  });
}

export const checkout_cart = (itemIds) => dispatch => {
  checkout({ itemIds })
  .then(res => res.json())
  .then(res => {
    dispatch(receive_cart_ids(res.itemIds));
    dispatch(receive_cart_items(res.itemIds));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
  });
}

export const get_orders = () => dispatch => {
  getOrders()
  .then(res => res.json())
  .then(res => {
    dispatch(receive_orders(res.orders));
  })
  .catch(err => console.log(`Error reported: ${err}`))
}

export const update_order_item = newItem => dispatch => {
  updateProduct(newItem)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_orders(res.orders));
  })
  .catch(err => console.log(`Error reported: ${err}`))
}

export const add_to_cart = (item) => dispatch => {
  addItemToCart(item)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_cart_ids(res.itemIds));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
  })
}

export const get_shipping_details = (shippingIds) => dispatch => {
  getShipping(shippingIds)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_shipping_details(res.shippingAddress));
  })
.catch(err => console.log(`Error reported: ${err}`));
}

export const change_primary_shipping = (addressId) => dispatch => {
  changePrimaryShipping(addressId)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res));
  })
  .catch(err => console.log(`Error reported: ${err}`));
}

export const delete_one_notif = (notificationId) => dispatch => {
  deleteOneNotification(notificationId)
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
  })
  .catch(err => console.log(`Error reported: ${err}`))
}

export const delete_all_notif = () => dispatch => {
  deleteAllNotifications()
  .then(res => res.json())
  .then(res => {
    dispatch(receive_user(res.user));
  })
  .catch(err => console.log(`Error reported: ${err}`))
}

export const accept_package = (notificationId) => dispatch => {
  acceptPackage(notificationId)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    dispatch(receive_user(res.user));
  })
  .catch(err => console.log(`Error reported: ${err}`))
}

export const sign_in = (data) => dispatch => {
  submitSignIn(data)
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', res.user._id);
    dispatch(get_authenticated_state(true));
  })
  .catch(err => {
    console.log(`Error reported: ${err}`);
    dispatch(get_authenticated_state(false));
  });
}

export const sign_out = () => dispatch => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch(un_auth(false));
}
