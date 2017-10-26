import React, { Component } from 'react';
import { updateUser } from '../../helpers/api';

class EditProfile extends Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingCity: '',
    mailingCountry: '',
    mailingZip: '',
    loading: false,
  }

  componentDidMount() {
    const {
      username,
      firstname,
      lastname,
      email,
      mailingAddress1,
      mailingAddress2,
      mailingCity,
      mailingCountry,
      mailingZip
    } = this.props.user;

    this.setState({
      username,
      firstname,
      lastname,
      email,
      mailingAddress1,
      mailingAddress2,
      mailingCity,
      mailingCountry,
      mailingZip
    });
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

  updateProfile() {
    this.setState({ loading: true });
    const newUser = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      mailingAddress1: this.state.mailingAddress1,
      mailingAddress2: this.state.mailingAddress2,
      mailingCity: this.state.mailingCity,
      mailingCountry: this.state.mailingCountry,
      mailingZip: this.state.mailingZip
    };
    updateUser(newUser)
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false });
        this.props.done();
      })
      .catch(err => console.log(`Error reported: ${err}`));
  }

  render() {
    return(
      <div className="container">

        {
          this.state.loading ?
          (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )
          :
          <div></div>
        }

        <div>
          <div className="row">
            <div className="col s12">
              <h5>Edit Profile</h5>
            </div>
          </div>
          <br />
          <div className="card">
            <div className="row">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "Username",
                    this.state.username,
                    (e) => this.setState({ username: e.target.value })
                  )
                }
                <label className="active" htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "firstname",
                    this.state.firstname,
                    (e) => this.setState({ firstname: e.target.value })
                  )
                }
                <label className="active" htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "lastname",
                    this.state.lastname,
                    (e) => this.setState({ lastname: e.target.value })
                  )
                }
                <label className="active" htmlFor="lastname">Last Name</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "email",
                    "email",
                    this.state.email,
                    (e) => this.setState({ email: e.target.value })
                  )
                }
                <label className="active" htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingAddress1",
                    this.state.mailingAddress1,
                    (e) => this.setState({ mailingAddress1: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingAddress1">Mailing Address 1</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingAddress2",
                    this.state.mailingAddress2,
                    (e) => this.setState({ mailingAddress2: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingAddress2">Mailing Address 2</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingCity",
                    this.state.mailingCity,
                    (e) => this.setState({ mailingCity: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingCity">Mailing City</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingCountry",
                    this.state.mailingCountry,
                    (e) => this.setState({ mailingCountry: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingCountry">Mailing Country</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingZip",
                    this.state.mailingZip,
                    (e) => this.setState({ mailingZip: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingZip">Mailing Zip</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            <button
              onClick={this.updateProfile.bind(this)}
              className="waves-effect waves-light btn"
              id="update-user">Update User</button>
          </div>
      </div>
    )
  }
}

export default EditProfile;