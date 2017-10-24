import React, { Component } from 'react';
import { getCart, getItems, deleteItem } from '../../helpers/api';
import { Link } from 'react-router-dom';

class Cart extends Component {
  state = {
    cartItemIds: [],
    cartItems: [],
    loading: false,
    quantity: 1
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
    this.setState({ loading: true });
    deleteItem({itemId: id})
      .then(res => res.json())
      .then(res => {
        this.setState({ cartItemIds: res, loading: false });
        this.getCartData();
      })
      .catch(err => {
        console.log(`Error reported: ${err}`);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="container">
        {
          this.state.loading ?
          (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )
          :
          <div></div>
        }

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
                  <div className="col s8">
                    {item.name}
                    <div className="row">
                      <div className=""><h6>Price: <b>{item.price}</b></h6></div>
                      <Link to={item.url} target="_blank">View Product</Link>
                    </div>
                  </div>
                  <div className="col s2">
                    <button
                      onClick={() => this.onDeleteItem(item._id)}
                      className="waves-effect waves-light btn">Remove</button>
                      <div className="row">
                        <div className="col s6"><p>Qty: </p></div>
                        <div className="col s6"><input id="qty" type="number" value={this.state.quantity} onChange={(e) => this.setState({ quantity: e.target.value })} /></div>
                      </div>
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