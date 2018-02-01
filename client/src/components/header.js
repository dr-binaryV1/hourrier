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
import ExpandMore from 'react-icons/lib/md/expand-more';
import ExpandLess from 'react-icons/lib/md/expand-less';
import Home from 'react-icons/lib/md/home';

class Header extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => {
      document.getElementById('navbar-header').classList.add('pull-up');
      document.getElementById('navbar-header').classList.remove('pull-down');
      document.getElementById('down-arrow').classList.remove('hide');
      document.getElementById('up-arrow').classList.add('hide')
    });
    return this.props.authenticated ? this.props.get_shopping_cart() | this.props.get_user() : ''
  }

  componentDidUpdate() {
    if (this.props.user){
      if (this.props.user.traveler) {
        document.getElementById('menu-icons').style.width = "1090px";
        document.getElementById('menu-icons').style.margin = "2% 8%";
      } else {
        document.getElementById('menu-icons').style.width = "790px";
        document.getElementById('menu-icons').style.margin = "2% 20%";
      }
    }
  }

  render() {
    const { user } = this.props;
    return (
      user && user.role === "admin" ?
        <div></div>
        :
        <div>
          <div className="navbar-fixed" id="navbar-header">
            <nav className="nav-container">
              <div className="nav-wrapper">
                {
                  this.props.authenticated ?
                    <ul className="menu-icons right hide-on-med-and-down" id="menu-icons">
                      <li><Link className="active" id="home" title="Home" to="/"><Home size={60} /><p>Home</p></Link></li>
                      <li><Link title="Profile" id="profile" to="/profile"><Profile size={60} /><p>Account</p></Link></li>
                      <li>
                        <Link
                          id="notifications"
                          title="Notifications"
                          to="/notifications">
                          {
                            user ?
                              user.notificationIds.length > 0 ?
                                <ActiveNotifications size={60} color="#F00" />
                              :
                                <Notifications size={60} />
                            :
                              ''
                          }
                          <p>Notifications</p>
                          <div className="notification"><p>{user ? user.notificationIds.length : 0}</p></div>
                        </Link>
                      </li>
                      {
                        this.props.user ?
                          this.props.user.traveler ?
                            <li>
                              <Link
                                id="shipping"
                                title="Shipping"
                                to="/packages">
                                <Shipping size={60} />
                                <p>Shipping</p>
                                <div className="notification"><p>{user ? user.packageIds.length : 0}</p></div>
                              </Link>
                            </li>
                            :
                            ''
                          :
                          ''
                      }
                      <li>
                        <Link
                          id="shopping"
                          title="Shopping Cart"
                          to="/shopping-cart">
                          <ShoppingCart size={60} />
                          <p>Cart</p>
                        </Link>
                        <div className="notification"><p>{this.props.cartIds ? this.props.cartIds.length : 0}</p></div>
                      </li>
                      <li><Link title="Sign Out" to="/sign-out"><SignOut size={60} /><p>Sign Out</p></Link></li>
                    </ul>
                  :
                    ""
                }
              </div>
            </nav>
          </div>
          <div className="menu-controller">
            <div className="circle-background" onClick={() => { 
              if (document.getElementById('navbar-header').classList.contains('pull-down')) {
                document.getElementById('down-arrow').classList.remove('hide');
                document.getElementById('up-arrow').classList.add('hide')
                document.getElementById('navbar-header').classList.add('pull-up');
                document.getElementById('navbar-header').classList.remove('pull-down');
              } else {
                document.getElementById('down-arrow').classList.add('hide');
                document.getElementById('up-arrow').classList.remove('hide')
                document.getElementById('navbar-header').classList.add('pull-down');
                document.getElementById('navbar-header').classList.remove('pull-up');             
              }
            }
            }>
              Menu
              <ExpandMore size={30} className="down-arrow" id="down-arrow" />
              <ExpandLess size={30} className="up-arrow hide" id="up-arrow" />
            </div>
          </div>
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
