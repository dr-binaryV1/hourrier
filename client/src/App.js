import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { get_authenticated_state } from './actions';
import './App.css';

import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Cart from './components/order/cart';
import Header from './components/header';
import Profile from './components/user/profile';
import Home from './components/home';
import RequireAuth from './hoc/requireAuth';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    token ? this.props.get_authenticated_state(true) : this.props.get_authenticated_state(false);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className="App">
        {
          authenticated === true || authenticated === false ?
        <div>
          <Header />
          <Route exact path="/" component={RequireAuth(Home)} />
          <Route exact path="/shopping-cart" component={RequireAuth(Cart)} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-out" component={SignOut} />
          <Route exact path="/profile" component={RequireAuth(Profile)} />
        </div>
        :
        ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
  }
}

export default withRouter(connect(mapStateToProps, { get_authenticated_state })(App));
//export default App;
