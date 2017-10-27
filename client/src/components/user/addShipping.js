import React, { Component } from 'react';
import { addShipping } from '../../helpers/api';
import { ProgressBar, Button } from 'react-materialize';

class AddShipping extends Component {
  state = {
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingCountry: '',
    shippingZip: '',
    loading: false
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

  onSubmitShipping() {
    this.setState({ loading: true });
    const newAddress = {
      shippingAddress1: this.state.shippingAddress1,
      shippingAddress2: this.state.shippingAddress2,
      shippingCity: this.state.shippingCity,
      shippingCountry: this.state.shippingCountry,
      shippingZip: this.state.shippingZip
    };

    addShipping(newAddress)
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(`Error reported: ${err}`);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>

        {
          this.state.loading ? <ProgressBar /> : ''
        }

        <div className="row left-align container-padding">
          <div className="col s12">
            <h5>Add Shipping</h5>
          </div>
        </div>

        <div className="row container-padding">
          <div className="row">
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
            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "shippingAddress2",
                  this.state.shippingAddress2,
                  (e) => this.setState({ shippingAddress2: e.target.value })
                )
              }
              <label htmlFor="shippingAddress2">Shipping Address 2</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "shippingCity",
                  this.state.shippingCity,
                  (e) => this.setState({ shippingCity: e.target.value })
                )
              }
              <label htmlFor="shippingCity">Shipping City</label>
            </div>
            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "shippingCountry",
                  this.state.shippingCountry,
                  (e) => this.setState({ shippingCountry: e.target.value })
                )
              }
              <label htmlFor="shippingCountry">Shipping Country</label>
            </div>
            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "shippingZip",
                  this.state.shippingZip,
                  (e) => this.setState({ shippingZip: e.target.value })
                )
              }
              <label htmlFor="shippingZip">Shipping Zip</label>
            </div>
          </div>
          <div className="row">
            <Button
              onClick={this.onSubmitShipping.bind(this)}
              waves='light'
              id="add-shipping">Save</Button>

            <Button
              waves='light'
              id="cancel-add-shipping">Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddShipping;