import React, { Component } from 'react';
import AddShipping from './addShipping';

class ProfileDetails extends Component {
  state = {
    loading: false,
    addingShipping: false
  }

  render() {
    const { user } = this.props;

    return (
    <div className="container container-padding">
      <div className="row">
        <div className="col s6">
          
        </div>
        <div className="col s6 right-align search-btn">
          <button
            id="edit-profile"
            onClick={() => this.props.edit()}
            className="waves-effect waves-light btn">Edit Profile</button>
        </div>
      </div>
      <br />
      <div className="card container-padding">
        <div className="row">
          <div className="col s4 left-align">
            <h5>Username: {user.username}</h5>
          </div>
        </div>
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

      <div>
        {
          this.state.addingShipping ?
          <AddShipping />
          :
          user.shippingAddressIds.length < 1 ?
          <div className="row container-padding">
            <div className="row">
              <div className="col s6 left-align">
                <h5>Shipping Address</h5>
              </div>
              <div className="col s6 right-align search-btn">
                <button
                  onClick={() => this.setState({ addingShipping: true })}
                  className="waves-effect waves-light btn"
                  id="add-shipping-address">Add</button>
              </div>
            </div>
            <div className="row card">
              <h6>No Shipping Address</h6>
            </div>
          </div>
          :
          ''  
        }
      </div>

      <div className="row">
        <div className="col s6 left-align">
          <h5>Travel Itinerary</h5>
        </div>
        <div className="col s6 right-align search-btn">
          <button className="waves-effect waves-light btn" id="add-itinerary">Add</button>
        </div>
      </div>
      <div className="row container-padding">
      {
        user.intineraryIds.length < 1 ?
        <div className="row card">
          <h6>No Travel Itinerary</h6>
        </div>
        :
        ''  
      }
      </div>
    </div>
    )
  }
}

export default ProfileDetails;