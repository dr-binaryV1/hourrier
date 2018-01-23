import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { get_authenticated_state, get_user } from './actions';

import { Link } from 'react-router-dom';
import './App.css';

import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Cart from './components/order/cart';
import Header from './components/header';
import Profile from './components/user/profile';
import Home from './components/home';
import RequireAuth from './hoc/requireAuth';
import RequireAdmin from './hoc/requireAdmin';
import AdminDashboard from './components/admin/admin-dashboard';
import KnutsfordDashboard from './components/knutsford-admin';
import OrderDetail from './components/admin/orderItemDetail';
import Notifications from './components/notifications';
import Invoice from './components/order/invoice';
import Package from './components/packages';

class App extends Component {
  state = {
    currenlyViewing: 'signin'
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    token ? this.props.get_authenticated_state(true) && this.props.get_user() : this.props.get_authenticated_state(false);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className="App">
        {
          authenticated === true ?
            <div>
              <Header />
              <Route exact path="/" component={RequireAuth(Home)} />
              <Route exact path="/shopping-cart" component={RequireAuth(Cart)} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/sign-out" component={SignOut} />
              <Route exact path="/profile" component={RequireAuth(Profile)} />
              <Route exact path="/packages" component={RequireAuth(Package)} />
              <Route exact path="/notifications" component={RequireAuth(Notifications)} />
              <Route exact path="/hourrier-admin" component={RequireAuth(AdminDashboard)} />
              <Route exact path="/knutsford" component={RequireAuth(KnutsfordDashboard)} />
              <Route path="/hourrier-admin/orders/:id" component={RequireAuth(OrderDetail)} />
              <Route path="/orders/invoice/:id" component={RequireAuth(Invoice)} />
            </div>
            :
            <div className="app__forms">
              <div className="app__signup col-s4" id="app__signup">
                <div className="row">
                  <div className="col s12">
                    <img
                      width="200"
                      height="200"
                      src="images/hourrier_logo.jpg"
                      alt="hourrier trademark" />
                  </div>
                </div>
                <p className="justify-text">Need a package from Amazon sent to Jamaica? Look no further. We are Hourrier, your all-in-one shopping platform. You shop, we deliver!</p>
                <hr className="app__signup-border" />
                <h4 className="app__signup-title" id="app__signup-title">Dont Have An Account?</h4>
                <div className="app__signup-button" id="app__signup-button"
                  onClick={() => {
                    document.getElementById('app__signup').classList.add('animate-right');
                    document.getElementById('app__signup-title').innerHTML = 'Have An Account?';
                    document.getElementById('app__signin').classList.add('animate-left');
                    document.getElementById('app__signup-button').style.display = 'none';
                    document.getElementById('app__signup-change').style.display = 'block';
                    setTimeout(function () {
                      document.getElementById('app__signup').classList.add('switch');
                      document.getElementById('app__signin').classList.add('switch');
                      document.getElementById('app__signup').classList.remove('animate-right');
                      document.getElementById('app__signin').classList.remove('animate-left');
                    }, 500);

                    this.setState({ currenlyViewing: 'signup' })
                  }
                  }
                >
                  Sign Up
              </div>
                <div className="app__signup-change" id="app__signup-change"
                  onClick={() => {
                    document.getElementById('app__signup').classList.add('return-left')
                    document.getElementById('app__signin').classList.add('return-right');
                    setTimeout(function () {
                      document.getElementById('app__signup').classList.remove('switch');
                      document.getElementById('app__signin').classList.remove('switch');
                      document.getElementById('app__signup').classList.remove('return-left');
                      document.getElementById('app__signin').classList.remove('return-right');
                    }, 500);
                    document.getElementById('app__signup-title').innerHTML = 'Dont Have An Account?';
                    document.getElementById('app__signup-button').style.display = 'block';
                    document.getElementById('app__signup-change').style.display = 'none';
                    document.getElementById('app__signup-button').innerHTML = 'Sign In';
                    this.setState({ currenlyViewing: 'signin' })
                  }
                  }
                >
                  Sign In
                </div>
              </div>

              <div className="app__signin col-s4" id="app__signin">
                <div className="background col-s12"></div>
                {this.state.currenlyViewing === 'signin' ? <SignIn /> : <SignUp />}
              </div>
            </div>
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

export default withRouter(connect(mapStateToProps, { get_authenticated_state, get_user })(App));