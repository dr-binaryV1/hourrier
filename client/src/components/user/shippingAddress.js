import React from 'react';
import { Button } from 'react-materialize';

const ShippingAddress = props => {
  const { address } = props;

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
          <Button className="red btn-spacing" waves='light'>Remove</Button>
          <Button waves='light'>Use</Button>
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

export default ShippingAddress;