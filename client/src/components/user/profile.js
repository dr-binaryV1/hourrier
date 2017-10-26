import React, {Component } from 'react';
import { getUser } from '../../helpers/api';

import EditProfile from './edit_profile';

class Profile extends Component {
  state = {
    user: null,
    editingProfile: false
  }

  componentDidMount() {
    getUser()
      .then(res => res.json())
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(`Error reported: ${err}`));
  }

  editComplete() {
    this.setState({ editingProfile: false });
    getUser()
    .then(res => res.json())
    .then(res => this.setState({ user: res }))
    .catch(err => console.log(`Error reported: ${err}`));
  }

  render() {
    const { user, editingProfile } = this.state;

    return (
      <div>
        {
          user ?
          editingProfile ?
          <EditProfile user={user} done={this.editComplete.bind(this)} />
          :
        <div className="container container-padding">
          <div className="row">
            <div className="col s6">
              
            </div>
            <div className="col s6 right-align search-btn">
              <button
                id="edit-profile"
                onClick={() => this.setState({ editingProfile: true })}
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

          <div className="row">
            <div className="col s6 left-align">
              <h5>Shipping Address</h5>
            </div>
            <div className="col s6 right-align search-btn">
              <button className="waves-effect waves-light btn" id="add-shipping-address">Add</button>
            </div>
          </div>

          <div className="row">
            <div className="col s6 left-align">
              <h5>Travel Itinerary</h5>
            </div>
            <div className="col s6 right-align search-btn">
              <button className="waves-effect waves-light btn" id="add-itinerary">Add</button>
            </div>
          </div>
        </div>
        :
        ''
        }
      </div>
    )
  }
}

export default Profile;