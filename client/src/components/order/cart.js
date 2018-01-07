import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  get_shopping_cart,
  delete_shoppingcart_item,
  checkout_cart,
  get_user
} from '../../actions';
import { Link } from 'react-router-dom';
import Select2 from 'react-select2-wrapper';
import { Button, Row, Col } from 'react-materialize';
import { knutsfordLocation } from '../../utils/appData';

class Cart extends Component {
  state = {
    loading: false,
    location: 'Kingston'
  }

  componentDidMount() {
    this.props.get_shopping_cart();
    this.props.get_user();
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? ''
      :
      this.finalize()
  }

  onQuantityChange(qty) {
    return parseInt(qty, 10) < 1 ?
      document.getElementById('qty').value = 1
      :
      ''
  }

  onCheckoutItems() {
    this.setState({ loading: true });
    this.props.checkout_cart(this.props.cartItemIds, this.state.location);
  }

  onDeleteItem(id) {
    this.setState({ loading: true });
    this.props.delete_shoppingcart_item(id);
  }

  finalize() {
    this.setState({ loading: false });
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
          this.props.cartItems ?
            this.props.cartItems.length < 1 ?
              <div>
                <div className="empty-cart-container" />
                <Button
                  onClick={() => this.props.history.push('/')}
                  waves="light"
                  className="blue btn-spacing">
                  Continue Shopping
            </Button>
              </div>
              :
              <div>
                <div className="row">
                  <div className="col s3">
                    <Select2
                      required={true}
                      id="deliveryLocation"
                      defaultValue="Kingston"
                      value={this.state.location}
                      onSelect={(e) => this.setState({ location: e.target.value })}
                      data={knutsfordLocation.sort()}
                    />
                    <label htmlFor="deliveryLocation" className="active">Select Delivery Location</label>
                  </div>
                </div>
                <ul>
                  {
                    this.props.cartItems ?
                      this.props.cartItems.map(item => {
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
                              <Button
                                onClick={() => this.onDeleteItem(item._id)}
                                waves='light'>Remove</Button>
                              <div className="row">
                                <div className="col s6"><p>Qty: </p></div>
                                <div className="col s6"><input id="qty" type="number" defaultValue={1} onChange={(e) => this.onQuantityChange(e.target.value)} /></div>
                              </div>
                            </div>
                          </div>
                        </li>
                      })
                      :
                      ''
                  }
                </ul>
                <div className="row">
                  <Button
                    onClick={this.onCheckoutItems.bind(this)}
                    waves='light'
                    id="checkout-btn">Find me a Traveler
              </Button>
                </div>
              </div>
            :
            ''
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems,
    cartItemIds: state.cartIds,
    user: state.user
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    get_shopping_cart,
    delete_shoppingcart_item,
    checkout_cart,
    get_user
  })(Cart));