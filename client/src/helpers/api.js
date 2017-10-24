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