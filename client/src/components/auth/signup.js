import React, { Component } from 'react';
import { submitSignUp } from '../../helpers/api';
import { Button, Input } from 'react-materialize';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_authenticated_state } from '../../actions';

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
    firstnameError: '',
    lastnameError: '',
    usernameError: '',
    emailError: '',
    address1Error: '',
    address2Error: '',
    cityError: '',
    zipError: '',
    countryError: '',
    passwordError: '',
    confirmPasswordError: ''
  }

  componentDidUpdate() {
    return this.props.authenticated ? this.props.history.push('/') : '';
  }

  renderInput(name, type, id, val, onchange, errState) {
    return(
      <input
        className="validate"
        required={true}
        type={type}
        id={id}
        value={val}
        onChange={onchange}
        onBlur={() => this.checkField(val, errState, type, name)}
      />
    )
  }

  checkField(fieldVal, errState, type='text', name) {
    fieldVal ? this.setState({ [errState]: '' }) : this.setState({ [errState]: `${name} is required` });
    type === 'email' ? this.checkEmailField() ? this.setState({ [errState]: '' })
    : this.setState({ [errState]: 'Invalid Email' }) : ''
  }

  isDataValid() {
    const {
      firstnameError,
      lastnameError,
      usernameError,
      emailError,
      address1Error,
      address2Error,
      cityError,
      zipError,
      countryError,
      passwordError,
      confirmPasswordError
    } = this.state;

    return usernameError !== '' && firstnameError !== '' && lastnameError !== '' && emailError !== '' && address1Error !== '' &&
    address2Error !== '' && cityError !== '' && zipError !== '' && countryError !== '' && passwordError !== '' && confirmPasswordError !== '' ?
    false : true;
  }

  checkEmailField() {
    return this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ?
    true : false;
  }

  checkAllFields() {
    this.setState({ loading: false });
    this.state.username ? this.setState({ usernameError: '' }) : this.setState({ usernameError: 'Username is required' });
    this.state.firstname ? this.setState({ firstnameError: '' }) : this.setState({ firstnameError: 'Firstname is required' });
    this.state.lastname ? this.setState({ lastnameError: '' }) : this.setState({ lastnameError: 'Last Name is required' });
    this.state.email ? this.checkEmailField() ?
    this.setState({ emailError: '' }) : this.setState({ emailError: 'Invalid Email' }) :this.setState({ emailError: 'Email is required' });
    this.state.address1 ? this.setState({ address1Error: '' }) : this.setState({ address1Error: 'Address 1 is required' });
    this.state.address2 ? this.setState({ address2Error: '' }) : this.setState({ address2Error: 'Address 2 is required' });
    this.state.city ? this.setState({ cityError: '' }) : this.setState({ cityError: 'City is required' });
    this.state.zip ? this.setState({ zipError: '' }) : this.setState({ zipError: 'Zip is required' });
    this.state.country ? this.setState({ countryError: '' }) : this.setState({ countryError: 'Country is required' });
    this.state.password ? this.setState({ passwordError: '' }) : this.setState({ passwordError: 'Password is required' });
    this.state.confirmPassword ? this.setState({ confirmPasswordError: '' }) : this.setState({ confirmPasswordError: 'Confirm Password is required' });
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
      password
    }

    console.log(this.isDataValid());
    this.isDataValid() === true ?
    submitSignUp(data)
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', res.user._id);
      this.props.get_authenticated_state(true);
    })
    .catch(err => {
      console.log(`Error reported: ${err}`);
      this.props.get_authenticated_state(false);
      this.setState({ loading: false });
    })
    :
    this.checkAllFields();
  }

  render() {
    return (
      <div className="app__signup-container">
        <h4 className="app__signup-form-title">Sign Up</h4>
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
            <div className="input-field col s3">
              {
                this.renderInput(
                  'Username',
                  "text",
                  "username",
                  this.state.username,
                  (e) => this.setState({ username: e.target.value }),
                  'usernameError'
                )
              }
              <label htmlFor="username">Username</label>
              <p className="important-msg left-align">{this.state.usernameError}</p>
            </div>

            <div className="input-field col s3">
              {
                this.renderInput(
                  'First Name',
                  "text",
                  "firstname",
                  this.state.firstname,
                  (e) => this.setState({ firstname: e.target.value }),
                  'firstnameError'
                )
              }
              <label htmlFor="firstname">First Name</label>
              <p className="important-msg left-align">{this.state.firstnameError}</p>
            </div>

            <div className="input-field col s3">
              {
                this.renderInput(
                  'Last Name',
                  "text",
                  "lastname",
                  this.state.lastname,
                  (e) => this.setState({ lastname: e.target.value }),
                  'lastnameError'
                )
              }
              <label htmlFor="lastname">Last Name</label>
              <p className="important-msg left-align">{this.state.lastnameError}</p>
            </div>

            <div className="input-field col s3">
              {
                this.renderInput(
                  'Email',
                  "email",
                  "email",
                  this.state.email,
                  (e) => this.setState({ email: e.target.value }),
                  'emailError'
                )
              }
              <label htmlFor="email">Email</label>
              <p className="important-msg left-align">{this.state.emailError}</p>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  'Address 1',
                  "text",
                  "address1",
                  this.state.address1,
                  (e) => this.setState({ address1: e.target.value }),
                  'address1Error'
                )
              }
              <label htmlFor="address1">Address 1</label>
              <p className="important-msg left-align">{this.state.address1Error}</p>
            </div>

            <div className="input-field col s6">
              {
                this.renderInput(
                  'Address 2',
                  "text",
                  "address2",
                  this.state.address2,
                  (e) => this.setState({ address2: e.target.value }),
                  'address2Error'
                )
              }
              <label htmlFor="address2">Address 2</label>
              <p className="important-msg left-align">{this.state.address2Error}</p>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              {
                this.renderInput(
                  'City',
                  "text",
                  "city",
                  this.state.city,
                  (e) => this.setState({ city: e.target.value }),
                  'cityError'
                )
              }
              <label htmlFor="city">City</label>
              <p className="important-msg left-align">{this.state.cityError}</p>
            </div>

            <div className="input-field col s4">
              {
                this.renderInput(
                  'Zip',
                  "number",
                  "zip",
                  this.state.zip,
                  (e) => this.setState({ zip: e.target.value }),
                  'zipError'
                )
              }
              <label htmlFor="zip">Zip</label>
              <p className="important-msg left-align">{this.state.zipError}</p>
            </div>

            <div className="input-field col s4">
            {
              this.renderInput(
                'Country',
                "text",
                "country",
                this.state.country,
                (e) => this.setState({ country: e.target.value }),
                'countryError'
              )
            }
            <label htmlFor="country">Country</label>
            <p className="important-msg left-align">{this.state.countryError}</p>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  'Password',
                  "password",
                  "password",
                  this.state.password,
                  (e) => this.setState({ password: e.target.value }),
                  'passwordError'
                )
              }
              <label htmlFor="password">Password</label>
              <p className="important-msg left-align">{this.state.passwordError}</p>
            </div>

            <div className="input-field col s6">
              {
                this.renderInput(
                  'Confirm Password',
                  "password",
                  "confirm-password",
                  this.state.confirmPassword,
                  (e) => this.setState({ confirmPassword: e.target.value }),
                  'confirmPasswordError'
                )
              }
              <label htmlFor="confirm-password">Confirm Password</label>
              <p className="important-msg left-align">{this.state.confirmPasswordError}</p>
            </div>
          </div>

          <Button
            className="app__submit-signup"
            onClick={this.onSubmitForm.bind(this)}
            id="submit">
              Sign Up
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
  }
}

export default withRouter(connect(mapStateToProps, { get_authenticated_state })(SignIn));
