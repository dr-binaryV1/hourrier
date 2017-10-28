import React, { Component } from 'react';
import { delete_shipping_address } from '../../actions';
import { connect }from 'react-redux';
import { Button } from 'react-materialize';

class ShippingAddress extends Component {
  render() {
    const { address } = this.props;

    return (
      <div className="row card container-padding">
        <div className="row">
          <div className="col s4 left-align">
            <p>Shipping Address 1: {address.shippingAddress1}</p>
          </div>
          <div className="col s4 left-align">
            <p>Shipping Address 2: {address.shippingAddress2}</p>
          </div>
          <div className="col s4 right-align">
            <Button
              onClick={() => this.props.delete_shipping_address({addressId: address._id})}
              className="red btn-spacing"
              waves='light'>Remove</Button>
            <Button className="green" waves='light'>Primary</Button>
          </div>
        </div>

        <div className="row">
          <div className="col s4 left-align">
            <p>Shipping City: {address.shippingCity}</p>
          </div>
          <div className="col s4 left-align">
            <p>Shipping Country: {address.shippingCountry}</p>
          </div>
          <div className="col s4 left-align">
            <p>Shipping Zip: {address.shippingZip}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { delete_shipping_address })(ShippingAddress);