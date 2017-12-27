import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_authenticated_state, get_user } from '../../actions';
import { submitSignIn } from '../../helpers/api';
import { Button } from 'react-materialize';
import Error from 'react-icons/lib/md/error';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    loading: ''
  };

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? ''
      :
      this.setState({ loading: false })
  }

  renderInput(type, id, val, onchange) {
    return (
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
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    //this.props.sign_in(data);
    submitSignIn(data)
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user._id);
        this.props.get_authenticated_state(true);
        this.props.get_user();
      })
      .catch(err => {
        console.log(`Error reported: ${err}`);
        this.setState({ loading: false, signinErr: 'Failed sign in attempt!' });
        this.props.get_authenticated_state(false);
      });
  }

  render() {
    return (
      <div className="app__signin-container">
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
        {
          this.state.signinErr ?
            <p className="error"><Error color='#F00' /> {this.state.signinErr}</p>
            :
            ''
        }
        <h4 className="app__signin-form-title">Sign In</h4>
        <div className="app__signin-form col-s11" id="signup-form">
          <div className="app__signin-row">
            <div className="input-field col-s12">
              {
                this.renderInput(
                  "email",
                  "email",
                  this.state.email,
                  (e) => this.setState({ email: e.target.value })
                )
              }
              <label htmlFor="username">Email</label>
            </div>
          </div>

          <div className="app__signin-row">
            <div className="input-field col-s12">
              {
                this.renderInput(
                  "password",
                  "Password",
                  this.state.password,
                  (e) => this.setState({ password: e.target.value })
                )
              }
              <label htmlFor="firstname">Password</label>
              <p>Forgot your password?</p>
            </div>
          </div>

          <div className="row">
            <div className="app__signin-button">
              <div
                onClick={this.onSubmitForm.bind(this)}
                id="submit">
                Sign In
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { get_authenticated_state, get_user })(SignIn));
