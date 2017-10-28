import {
  GET_USER,
  GET_CART_IDs,
  GET_CART_ITEMS,
  GET_SHIPPING_DETAILS
} from './types';
import {
  getUser,
  updateUser,
  addShipping,
  deleteShippingAddress,
  updateTravelerStatus,
  addItemToCart,
  getCart,
  getItems,
  deleteItem,
  checkout,
  getShipping
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