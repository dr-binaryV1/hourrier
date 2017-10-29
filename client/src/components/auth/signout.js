import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_out } from '../../actions';

class SignOut extends Component {
  componentDidMount() {
    this.props.sign_out();
  }

  render() {
    return (
      <div className="container">
        <h5>You signed out of Hourrier.</h5>
        <p>Please visit again soon.</p>
        <div className="signout-container" />
        <p>Please click <Link to="sign-in"><b>here</b></Link> to sign in.</p>
      </div>
    )
  }
}

export default withRouter(connect(null, { sign_out })(SignOut));