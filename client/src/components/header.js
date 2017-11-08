import React, { Component } from 'react';
import { get_shopping_cart } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCart from 'react-icons/lib/md/shopping-cart';
import Profile from 'react-icons/lib/md/account-circle';
import SignOut from 'react-icons/lib/md/exit-to-app';
import Notifications from 'react-icons/lib/md/notifications';
import ActiveNotifications from 'react-icons/lib/md/notifications-active';

class Header extends Component {
  componentDidMount() {
    return this.props.authenticated ? this.props.get_shopping_cart() : ''
  }

  render() {
    return (
      <div className="navbar-fixed">
      <nav className="blue">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Hourrier</Link>
          {
            this.props.authenticated ?
            <ul className="right hide-on-med-and-down">
              <li><Link title="Notifications" to="/notifications"><Notifications size={30} /></Link></li>
              <li><Link title="Profile" to="/profile"><Profile size={30} /></Link></li>
              <li>
                <Link
                  title="Shopping Cart"
                  to="/shopping-cart">
                    <ShoppingCart size={30} />
                  ({ this.props.cartIds ? this.props.cartIds.length : 0 })
                </Link>
              </li>
              <li><Link title="Sign Out" to="/sign-out"><SignOut size={30} /></Link></li>
            </ul>
            :
            <ul className="right hide-on-med-and-down">
              <li><Link to="/sign-in">Sign In</Link></li>
              <li><Link to="/sign-up">Sign Up</Link></li>
            </ul>
          }
        </div>
      </nav>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartIds: state.cartIds,
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps, { get_shopping_cart })(Header);