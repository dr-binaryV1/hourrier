import React, { Component } from 'react';
import { submitSignIn } from '../../helpers/api';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    loading: ''
  };

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
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    submitSignIn(data)
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user._id);
        console.log(res.user);
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
                  "email",
                  "email",
                  this.state.email,
                  (e) => this.setState({ email: e.target.value })
                )
              }
              <label htmlFor="username">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              {
                this.renderInput(
                  "password",
                  "Password",
                  this.state.password,
                  (e) => this.setState({ password: e.target.value })
                )
              }
              <label htmlFor="firstname">Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">              
              <button
                className="waves-effect waves-light btn"
                onClick={this.onSubmitForm.bind(this)}
                id="submit">
                  Sign In
              </button>
            </div>
          </div>
        </div> 
      </div>   
    )
  }
}

export default SignIn;