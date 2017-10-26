import React, { Component } from 'react';

class AddShipping extends Component {
  state = {
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingCountry: '',
    shippingZip: ''
  }

  renderInput(type, id, val, onchange) {
    return(
      <input
        type={type}
        id={id}
        value={val}
        onChange={onchange}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="row left-align container-padding">
          <div className="col s12">
            <h5>Add Shipping</h5>
          </div>
        </div>

        <div className="row card">
          <div className="input-field col s4">
            {
              this.renderInput(
                "text",
                "shippingAddress1",
                this.state.shippingAddress1,
                (e) => this.setState({ shippingAddress1: e.target.value })
              )
            }
            <label htmlFor="shippingAddress1">Shipping Address 1</label>
          </div>
        </div>
      </div>
    )
  }
}

export default AddShipping;