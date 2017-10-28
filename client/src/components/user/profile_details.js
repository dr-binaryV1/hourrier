import React, { Component } from 'react';
import { update_traveler_status } from '../../actions';
import { connect } from 'react-redux';
import AddShipping from './addShipping';
import { Collapsible, CollapsibleItem, Row } from 'react-materialize';
import { getShipping } from '../../helpers/api';
import ShippingAddress from './shippingAddress';
import { Button } from 'react-materialize';

class ProfileDetails extends Component {
  state = {
    loading: false,
    addingShipping: false,
    shippingAddresses: []
  }

  componentDidMount() {
    this.getShippingDetails();
  }

  getShippingDetails() {
    const { user } = this.props;
    getShipping({shippingIds: user.shippingAddressIds})
      .then(res => res.json())
      .then(res => {
        this.setState({ shippingAddresses: res.shippingAddress });
      })
    .catch(err => console.log(`Error reported: ${err}`));
  }

  completeAddingShipping() {
    this.getShippingDetails();
    this.setState({ addingShipping: false });
  }

  stopAddingShipping() {
    this.setState({ addingShipping: false });
  }

  render() {
    const { user } = this.props;

    return (
    <div className="container container-padding">
      <div className="row">
        <div className="col s6 left-align">
          <h5>Welcome back, <b>{user.username}</b></h5>
        </div>
        <div className="col s6 right-align search-btn">
          <Button
            id="edit-profile"
            onClick={() => this.props.edit()}
            waves='light'>Edit Profile</Button>
        </div>
      </div>
      <br />
      <div className="card container-padding">
        <div className="row left-align">
          <div className="col s4">
            <h6>First Name: {user.firstname}</h6>
          </div>

          <div className="col s4">
            <h6>Last Name: {user.lastname}</h6>
          </div>

          <div className="col s4">
            <h6>Email: {user.email}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s6">
            <h6>Mailing Address 1: {user.mailingAddress1}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s6">
            <h6>Mailing Address 2: {user.mailingAddress2}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s4">
            <h6>Mailing City: {user.mailingCity}</h6>
          </div>

          <div className="col s4">
            <h6>Mailing Country: {user.mailingCountry}</h6>
          </div>

          <div className="col s4">
            <h6>Mailing Zip: {user.mailingZip}</h6>
          </div>
        </div>
      </div>

      <Row>
        <h5>Are you traveling soon?</h5>
        <div className="switch">
          <label>No<input type="checkbox" checked={user.traveler} onChange={(e) => this.props.update_traveler_status({ status: e.target.checked})} />
            <span className="lever">
            </span>Yes
          </label>
        </div> 
      </Row>
      {
        user.traveler ?
      <Collapsible>
      <CollapsibleItem header='Shipping Address'>
      <div>
        {
          this.state.addingShipping ?
          <AddShipping
            done={this.completeAddingShipping.bind(this)}
            cancel={this.stopAddingShipping.bind(this)}/>
          :
          user.shippingAddressIds.length < 1 ?
          <div className="row container-padding">
            <div className="row">
              <div className="col s6 left-align">
                <h5>Shipping Address</h5>
              </div>
              <div className="col s6 right-align search-btn">
                <Button
                  onClick={() => this.setState({ addingShipping: true })}
                  waves='light'
                  id="add-shipping-address">Add</Button>
              </div>
            </div>
            <div className="row">
              <h6>No Shipping Address</h6>
            </div>
          </div>
          :
          <div>
            {
              this.state.shippingAddresses.map(address => {
                return <ShippingAddress key={address._id} address={address} />
              })
            }
            <div className="">
              <div className="col s12 right-align">
                <Button
                  floating
                  className='red'
                  onClick={() => this.setState({ addingShipping: true })}
                  waves='light'
                  id="add-shipping-address" >+</Button>
              </div>
            </div>
          </div>  
        }
      </div>
      </CollapsibleItem>
      <CollapsibleItem header='Travel Itinerary'>
      <div className="row">
        <div className="col s6 left-align">
          <h5>Travel Itinerary</h5>
        </div>
        <div className="col s6 right-align search-btn">
          <Button waves='light' id="add-itinerary">Add</Button>
        </div>
      </div>
      <div className="row container-padding">
      {
        user.intineraryIds.length < 1 ?
        <div className="row">
          <h6>No Travel Itinerary</h6>
        </div>
        :
        ''  
      }
      </div>
      </CollapsibleItem>
      </Collapsible>
      :
      ''
      }
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { update_traveler_status })(ProfileDetails);