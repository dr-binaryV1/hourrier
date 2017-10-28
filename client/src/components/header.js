import React, { Component } from 'react';
import { get_shopping_cart } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCart from 'react-icons/lib/md/shopping-cart';
import Profile from 'react-icons/lib/md/account-circle';

class Header extends Component {
  componentDidMount() {
    this.props.get_shopping_cart();
  }

  render() {
    return (
      <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Hourrier</Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/profile"><Profile size={30} /></Link></li>
            <li>
              <Link
                to="/shopping-cart">
                  <ShoppingCart size={30} />
                ({ this.props.cartIds ? this.props.cartIds.length : 0 })
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartIds: state.cartIds
  }
}

export default connect(mapStateToProps, { get_shopping_cart })(Header);