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
  .then(res => '')
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
      'user': localStorage.getItem('user')
    },
    method: 'GET'
  });
}

export function searchAmazon(amazonURL) {
  return fetch(`${url}/search`,{
    headers: {
      'Content-Type': 'application/json',
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
      'user': localStorage.getItem('user')
    },
    method: 'DELETE',
    body: JSON.stringify(addressId)
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