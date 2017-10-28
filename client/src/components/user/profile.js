import React, {Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../helpers/api';
import { get_user } from '../../actions';

import EditProfile from './edit_profile';
import ProfileDetails from './profile_details';

class Profile extends Component {
  state = {
    shippingAddresses: [],
    editingProfile: false
  }

  componentDidMount() {
    this.props.get_user();
  }

  changeToEdit() {
    this.setState({ editingProfile: true });
  }

  cancelEditing() {
    this.setState({ editingProfile: false });
  }

  editComplete() {
    this.setState({ editingProfile: false });
    getUser()
    .then(res => res.json())
    .then(res => this.setState({ user: res }))
    .catch(err => console.log(`Error reported: ${err}`));
  }

  render() {
    const { editingProfile } = this.state;
    const { user } = this.props;
    return (
      <div>
        {
          user ?
          editingProfile ?
          <EditProfile
            cancel={this.cancelEditing.bind(this)}
            done={this.editComplete.bind(this)} />
          :
          <ProfileDetails edit={this.changeToEdit.bind(this)} />
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

export default connect(mapStateToProps, {get_user})(Profile);