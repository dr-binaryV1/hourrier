import React, { Component } from 'react';
import { submitSignUp } from '../../helpers/api';
import { Button } from 'react-materialize';

class SignIn extends Component {
  state = {
    loading: false,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    password: '',
    confirmPassword: '',
    userTypeId: ''
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

  onSubmitForm() {
    this.setState({ loading: true });
    const {
      firstname,
      lastname,
      username,
      email,
      address1,
      address2,
      city,
      zip,
      country,
      password
    } = this.state;

    const data = {
      firstname,
      lastname,
      username,
      email,
      address1,
      address2,
      city,
      zip,
      country,
      password,
      userTypeId: "testdata"
    }

    submitSignUp(data)
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', res.user._id);
      this.setState({ loading: false });
    })
    .catch(err => {
      console.log(`Error reported: ${err}`);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
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

        <div id="signup-form">
          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "text",
                  "username",
                  this.state.username,
                  (e) => this.setState({ username: e.target.value })
                )
              }
              <label htmlFor="username">Username</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "text",
                  "firstname",
                  this.state.firstname,
                  (e) => this.setState({ firstname: e.target.value })
                )
              }
              <label htmlFor="firstname">First Name</label>
            </div>

            <div className="input-field col s6">
              {
                this.renderInput(
                  "text",
                  "lastname",
                  this.state.lastname,
                  (e) => this.setState({ lastname: e.target.value })
                )
              }
              <label htmlFor="lastname">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "email",
                  "email",
                  this.state.email,
                  (e) => this.setState({ email: e.target.value })
                )
              }
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "text",
                  "address1",
                  this.state.address1,
                  (e) => this.setState({ address1: e.target.value })
                )
              }
              <label htmlFor="address1">Address 1</label>
            </div>

            <div className="input-field col s6">
              {
                this.renderInput(
                  "text",
                  "address2",
                  this.state.address2,
                  (e) => this.setState({ address2: e.target.value })
                )
              }
              <label htmlFor="address2">Address 2</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "city",
                  this.state.city,
                  (e) => this.setState({ city: e.target.value })
                )
              }
              <label htmlFor="city">City</label>
            </div>

            <div className="input-field col s4">
              {
                this.renderInput(
                  "number",
                  "zip",
                  this.state.zip,
                  (e) => this.setState({ zip: e.target.value })
                )
              }
              <label htmlFor="zip">Zip</label>
            </div>

            <div className="input-field col s4">
              {
                this.renderInput(
                  "text",
                  "country",
                  this.state.country,
                  (e) => this.setState({ country: e.target.value })
                )
              }
              <label htmlFor="country">Country</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "password",
                  "password",
                  this.state.password,
                  (e) => this.setState({ password: e.target.value })
                )
              }
              <label htmlFor="password">Password</label>
            </div>

            <div className="input-field col s6">
              {
                this.renderInput(
                  "password",
                  "confirm-password",
                  this.state.confirmPassword,
                  (e) => this.setState({ confirmPassword: e.target.value })
                )
              }
              <label htmlFor="confirm-password">Confirm Password</label>
            </div>
          </div>

          <Button
            waves='light'
            onClick={this.onSubmitForm.bind(this)}
            id="submit">
              Sign Up
          </Button>
        </div>
      </div>
    )
  }
}

export default SignIn;
