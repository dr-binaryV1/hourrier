import React, { Component } from 'react';
import { get_shopping_cart, get_user } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCart from 'react-icons/lib/md/shopping-cart';
import Profile from 'react-icons/lib/md/account-circle';
import SignOut from 'react-icons/lib/md/exit-to-app';
import Notifications from 'react-icons/lib/md/notifications';
import Shipping from 'react-icons/lib/md/local-shipping';
import ActiveNotifications from 'react-icons/lib/md/notifications-active';

class Header extends Component {
  componentDidMount() {
    return this.props.authenticated ? this.props.get_shopping_cart() | this.props.get_user() : ''
  }

  render() {
    const { user } = this.props;
    return (
      user && user.role === "admin" ?
        <div></div>
        :
        <div className="navbar-fixed">
          <nav className="nav-container">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">Hourrier</Link>
              {
                this.props.authenticated ?
                  <ul className="right hide-on-med-and-down">
                    <li><Link title="Profile" to="/profile"><Profile size={30} /></Link></li>
                    <li>
                      <Link
                        title="Notifications"
                        to="/notifications">
                        {
                          user ?
                            user.notificationIds.length > 0 ?
                              <ActiveNotifications size={30} color="#F00" />
                              :
                              <Notifications size={30} />
                            :
                            ''
                        }
                        ({user ? user.notificationIds.length : 0})
                </Link></li>
                    {
                      this.props.user ?
                        this.props.user.traveler ?
                          <li>
                            <Link
                              title="Shipping"
                              to="/packages">
                              <Shipping size={30} />
                              ({user ? user.packageIds.length : 0})
                  </Link>
                          </li>
                          :
                          ''
                        :
                        ''
                    }
                    <li>
                      <Link
                        title="Shopping Cart"
                        to="/shopping-cart">
                        <ShoppingCart size={30} />
                        ({this.props.cartIds ? this.props.cartIds.length : 0})
                </Link>
                    </li>
                    <li><Link title="Sign Out" to="/sign-out"><SignOut size={30} /></Link></li>
                  </ul>
                  :
                  ""
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
    authenticated: state.authenticated,
    user: state.user
  }
}

export default connect(mapStateToProps, { get_shopping_cart, get_user })(Header);
