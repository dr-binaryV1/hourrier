import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import Cart from './components/order/cart';
import { getSecret } from './helpers/api'
import Header from './components/header';
import Profile from './components/user/profile';
import Home from './components/home';

class App extends Component {
  componentDidMount() {
    getSecret();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/shopping-cart" component={Cart} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
      </div>
    );
  }
}

export default App;
