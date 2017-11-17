//const url = "https://hourrier-dev.herokuapp.com";
const url = "http://localhost:3090";

export function submitSignUp(data) {
  return fetch(`${url}/signup`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function submitSignIn(data) {
  return fetch(`${url}/signin`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getSecret() {
  fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token')
    },
    method: 'GET'
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(`Error reported: ${err}`))
}

export function getUser() {
  return fetch(`${url}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user'),
    },
    method: 'GET'
  });
}

export function updateUser(user) {
  return fetch(`${url}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user'),
    },
    method: 'PUT',
    body: JSON.stringify(user)
  });
}

export function getCart() {
  return fetch(`${url}/shoppingcart`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'GET'
  });
}

export function getOrders() {
  return fetch(`${url}/orders`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token')
    },
    method: 'GET'
  });
}

export function searchAmazon(amazonURL) {
  return fetch(`${url}/search`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(amazonURL)
  });
}

export function addItemToCart(item) {
  return fetch(`${url}/shoppingcart`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(item)
  });
}

export function getItems(itemIds) {
  return fetch(`${url}/shoppingcartitem`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(itemIds)
  });
}

export function deleteItem(itemId) {
  return fetch(`${url}/shoppingcartitem`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'DELETE',
    body: JSON.stringify(itemId)
  });
}

export function checkItem(itemName) {
  return fetch(`${url}/shoppingcart/check`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(itemName)
  });
}

export function checkout(itemIds) {
  return fetch(`${url}/checkout`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(itemIds)
  });
}

export function addShipping(address) {
  return fetch(`${url}/shipping/add`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(address)
  });
}

export function getShipping(addressIds) {
  return fetch(`${url}/shipping`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(addressIds)
  });
}

export function changePrimaryShipping(addressId) {
  return fetch(`${url}/user/primaryShippingAddress`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'PUT',
    body: JSON.stringify(addressId)
  });
}

export function deleteShippingAddress(addressId) {
  return fetch(`${url}/shipping`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'DELETE',
    body: JSON.stringify(addressId)
  });
}

export function addItinerary(itinerary) {
  return fetch(`${url}/itinerary/add`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(itinerary)
  });
}

export function getItinerary(itineraryIds) {
  return fetch(`${url}/itinerary`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify(itineraryIds)
  });
}

export function deleteTravelItinerary(itineraryId) {
  return fetch(`${url}/itinerary`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'user': localStorage.getItem('user')
    },
    method: 'DELETE',
    body: JSON.stringify(itineraryId)
  });
}

export function updateTravelerStatus(status) {
  return fetch(`${url}/user/traveler`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user'),
    },
    method: 'PUT',
    body: JSON.stringify(status)
  });
}

export function getSingleOrder(orderId) {
  return fetch(`${url}/orders/one`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
    },
    method: 'POST',
    body: JSON.stringify({orderId})
  });
}

export function findTraveler(orderId, items) {
  return fetch(`${url}/orders/find/traveler`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
    },
    method: 'POST',
    body: JSON.stringify({orderId, items})
  });
}

export function getNotifications(notificationsId) {
  return fetch(`${url}/user/notifications`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
    },
    method: 'POST',
    body: JSON.stringify({notificationsId})
  });
}

export function deleteOneNotification(notificationId) {
  return fetch(`${url}/notifications`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user')
    },
    method: 'DELETE',
    body: JSON.stringify({notificationId})
  });
}

export function deleteAllNotifications() {
  return fetch(`${url}/notifications/all`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user')
    },
    method: 'DELETE'
  });
}

export function acceptPackage(notificationId) {
  return fetch(`${url}/user/notigications/accept`,{
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user')
    },
    method: 'POST',
    body: JSON.stringify({notificationId})
  });
}

export function updateProduct(newItem) {
  return fetch(`${url}/orders/item`, {
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token'),
      'userId': localStorage.getItem('user')
    },
    method: 'PUT',
    body: JSON.stringify({newItem})
  });
}
