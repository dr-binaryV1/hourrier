import React, { Component } from 'react';
import { delete_shipping_address, change_primary_shipping } from '../../actions';
import { connect }from 'react-redux';
import { Button } from 'react-materialize';
import TrashBin from 'react-icons/lib/md/delete';
import Check from 'react-icons/lib/md/check';

class ShippingAddress extends Component {
  render() {
    const { address, user } = this.props;

    return (
      <div className="row card container-padding">
        <div className="row">
          <div className="col s4 left-align">
            <p>Shipping Address 1: {address.shippingAddress1}</p>
          </div>
          <div className="col s4 left-align">
            <p>Shipping Address 2: {address.shippingAddress2}</p>
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

        <div className="row">
          <div className="col s5 left-align">
            {
              user.primaryShippingAddress === address._id ?
              <Button
                disabled={true}
                className="green btn-spacing"
                waves='light'>
                <Check size={20} /> Primary
              </Button>
              :
              <Button
                onClick={() => this.props.change_primary_shipping({primaryShippingAddress: address._id})}
                className="green btn-spacing"
                waves='light'>
                <Check size={20} /> Primary
              </Button>
            }
            <Button
              onClick={() => this.props.delete_shipping_address({addressId: address._id})}
              className="red"
              waves='light'>
              <TrashBin size={20} /> Remove
            </Button>
          </div>

          <div className="col s7 left-align">
            {/* <p><b>Successful set to primary shipping address.</b></p> */}
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

export default connect(
  mapStateToProps,
   { 
     delete_shipping_address,
     change_primary_shipping
   })(ShippingAddress);