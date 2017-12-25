import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get_user } from '../actions';

export default function requireAdmin(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.props.get_user();
    }

    componentDidUpdate() {
      this.props.user ? this.checkAuth() : '';
    }

    checkAuth() {
      !this.props.isLoggedIn ?
        this.props.history.push('/sign-in')
        : this.props.user.role !== 'admin' ?
          this.props.history.push('/')
          : ''
    }

    render() {
      const { user } = this.props;
      return (
      user ?
        user.role === "admin" ?
          this.props.isLoggedIn
            ? <Component { ...this.props } />
            : null
          : ''
        : ''
      )
    }
  }

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.authenticated,
      user: state.user
    }
  }

  return withRouter(connect(mapStateToProps, { get_user })(AuthenticatedComponent));
}