import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if ( ! this.props.isLoggedIn) {
        this.props.history.push('/sign-in');
      }
    }

    render() {
      return this.props.isLoggedIn
        ? <Component { ...this.props } />
        : null;
    }
  }

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.authenticated
    }
  }

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}