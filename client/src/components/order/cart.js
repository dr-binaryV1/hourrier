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
import Delete from 'react-icons/lib/md/delete'

class Cart extends Component {
  state = {
    loading: false,
    location: 'Kingston'
  }

  componentDidMount() {
    document.querySelector('.nav-wrapper .active').classList.remove('active');;
    document.getElementById('shopping').classList.add('active');
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
      <div>
        <div className="row">
          <div className="col s12 cart-searchbar">
            <div className="col s2 label"><p>Select Delivery Location:</p></div>
            <div className="col s3">
              <Select2
                required={true}
                id="deliveryLocation"
                defaultValue="Kingston"
                value={this.state.location}
                onSelect={(e) => this.setState({ location: e.target.value })}
                data={knutsfordLocation.sort()}
              />
            </div>
          </div>
        </div>
        <div className="page-margin container">
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
              <div className="cart-page">
                <div className="cart-header row margin-tb-zero">
                  <div className="col s2"><p>Item</p></div>
                  <div className="col s6"><p>Name</p></div>
                  <div className="col s2"><p>Price</p></div>
                  <div className="col s1"><p>Quantity</p></div>
                  <div className="col s1"><p>Remove</p></div>                  
                </div>
                <ul className="margin-tb-zero">
                  {
                    this.props.cartItems ?
                      this.props.cartItems.map(item => {
                        return <li key={item._id}>
                          <div className="row card margin-tb-zero">
                            <div className="col s2">
                              <img src={item.image} width="60" alt={item.name} />
                            </div>
                            <div className="col s6">
                              {item.name}
                              <div className="row">
                                <Link to={item.url} target="_blank">View Product</Link>
                              </div>
                            </div>
                            <div className="col s2">
                              <div className=""><h6><b>{item.price}</b></h6></div>
                            </div>                            
                            <div className="col s1">
                              <div className="col s12"><input id="qty" type="number" defaultValue={1} onChange={(e) => this.onQuantityChange(e.target.value)} /></div>
                            </div>
                            <div className="col s1">
                              <Delete
                                onClick={() => this.onDeleteItem(item._id)}
                                size={30} />
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