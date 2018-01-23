import React, { Component } from 'react';
import { add_shipping_address } from '../../actions';
import { connect } from 'react-redux';
import { ProgressBar, Button } from 'react-materialize';
import Home from 'react-icons/lib/md/home';

class AddShipping extends Component {
  state = {
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingCountry: '',
    shippingZip: '',
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? '' 
    :
    this.finalize()
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

    this.props.add_shipping_address(newAddress);
  }

  finalize() {
    this.setState({ loading: false });
    this.props.done();
  }

  render() {
    return (
      <div>

        {
          this.state.loading ? <ProgressBar /> : ''
        }

        <div className="row center-align container-padding">
          <div className="col s12">
            <h5>Add Shipping Address</h5>
          </div>
        </div>

        <div className="row profile-section container-padding">
          <div className="col s4 left-side left">
            <Home size={300} />
          </div>
          <div className="right-side right col s8">
            <div className="row">
              <div className="input-field col s12">
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
              <div className="input-field col s12">
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
          </div>
          <div className="col s12">
            <Button
              onClick={this.onSubmitShipping.bind(this)}
              className="btn-spacing"
              waves='light'
              id="add-shipping">Save</Button>

            <Button
              onClick={() => this.props.cancel()}
              className="red"
              waves='light'
              id="cancel-add-shipping">Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    shippingAddresses: state.shippingAddresses
  }
}

export default connect(mapStateToProps, { add_shipping_address })(AddShipping);