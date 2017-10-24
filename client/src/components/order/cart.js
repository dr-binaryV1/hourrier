import React, { Component } from 'react';
import { getCartItems } from '../../helpers/api';

class Cart extends Component {
  state = {
    cartItems: [],
    loading: false
  }

  componentDidMount() {
    getCartItems()
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ cartItems: res.itemIds });
      })
      .catch(err => console.log(`Error reported: ${err}`));
  }

  render() {
    return (
      <div className="container">
        {
          this.state.cartItems.length < 1 ?
          <h3>Shopping Cart Empty!</h3>
          :
          ''
        }
      </div>
    )
  }
}

export default Cart;