import React, {Component } from 'react';
import { getUser } from '../../helpers/api';

import EditProfile from './edit_profile';
import ProfileDetails from './profile_details';

class Profile extends Component {
  state = {
    user: null,
    shippingAddresses: [],
    editingProfile: false
  }

  componentDidMount() {
    getUser()
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res });
      })
      .catch(err => console.log(`Error reported: ${err}`));
  }

  changeToEdit() {
    this.setState({ editingProfile: true });
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
          <ProfileDetails user={user} edit={this.changeToEdit.bind(this)} />
          :
        ''
        }
      </div>
    )
  }
}

export default Profile;