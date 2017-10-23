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