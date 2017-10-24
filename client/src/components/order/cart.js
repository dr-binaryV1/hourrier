import React, { Component } from 'react';
import { getCart, getItems, deleteItem } from '../../helpers/api';

class Cart extends Component {
  state = {
    cartItemIds: [],
    cartItems: [],
    loading: false
  }

  componentDidMount() {
    this.getCartData();
  }

  getCartData() {
    getCart()
    .then(res => res.json())
    .then(res => {
      this.setState({ cartItemIds: res.itemIds });

      getItems({ itemIds: this.state.cartItemIds })
      .then(res => res.json())
      .then(res => {
        this.setState({ cartItems: res.items });
      })
      .catch(err => console.log(`Error reported: ${err}`));
    })
    .catch(err => console.log(`Error reported: ${err}`));
  }
  
  onDeleteItem(id) {
    deleteItem({itemId: id})
      .then(res => res.json())
      .then(res => {
        this.setState({ cartItemIds: res });
        this.getCartData();
      })
      .catch(err => console.log(`Error reported: ${err}`));
  }

  render() {
    return (
      <div className="container">
        {
          this.state.cartItemIds.length < 1 ?
          <h3>Shopping Cart Empty!</h3>
          :
          <ul>
            {
              this.state.cartItems.map(item => {
                return <li key={item._id}>
                <div className="row card">
                  <div className="col s2">
                    <img src={item.image} width="60" alt={item.name} />
                  </div>
                  <div className="col s7">
                    {item.name}
                    <div className="row">
                      <div className=""><h6>Price: <b>{item.price}</b></h6></div>
                    </div>
                  </div>
                  <div className="col s3">
                    <button
                      onClick={() => this.onDeleteItem(item._id)}
                      className="waves-effect waves-light btn">Remove</button>
                  </div>
                </div>
                </li>
              })
            }
          </ul>
        }
      </div>
    )
  }
}

export default Cart;