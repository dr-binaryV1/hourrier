import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_to_cart } from '../../actions';
import { get_user } from '../../actions';
import {
  searchAmazon,
  checkItem
} from '../../helpers/api';
import { Button } from 'react-materialize';

class Home extends Component {
  state = {
    searchURL: '',
    loading: false,
    itemAdded: null,
    itemInCart: null,
    urlError: ''
  }

  componentDidMount() {
    document.getElementById('search-btn').setAttribute('disabled', 'true');
    this.props.get_user();
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? '' 
    :
    this.finalize()
  }

  refreshField() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    searchBtn.removeAttribute('disabled');
    searchBtn.innerText = "Search";
    searchInput.removeAttribute('readonly');
  }

  onSearch() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.setAttribute('disabled', 'true');
    searchBtn.innerText = "Searching...";

    const searchInput = document.getElementById('search-input');
    searchInput.setAttribute('readonly', 'true');

    this.setState({ loading: true, urlError: '' });

    const expr = /www.amazon.com/;
    this.state.searchURL.match(expr) ?
    searchAmazon({ url: this.state.searchURL })
    .then(res => res.json())
    .then(res => {
      searchBtn.removeAttribute('disabled');
      searchBtn.innerText = "Search";

      searchInput.removeAttribute('readonly');
      res.price ? '' : res.price = 'N/A';
      res.image ? '' : res.image = 'images/No_image_available.svg';
      this.setState({ loading: false, product: res, itemAdded: false });

      checkItem({ itemName: res.title })
        .then(res => res.json())
        .then(res => this.setState({ itemInCart: res.itemFound }))
        .catch(err => console.log(`Error reported: ${err}`));
    })
    .catch(err => {
      console.log(`Error reported: ${err}`);
      this.setState({ loading: false });
    })
    :
    this.setState({urlError: 'Incorrect Url. Please enter an amazon url.', loading: false}) |
    this.refreshField();
  }

  onSearchTermChanged(term) {
    this.setState({ searchURL: term });
    const searchBtn = document.getElementById('search-btn');
    term !== '' ?
      searchBtn.removeAttribute('disabled')
    : searchBtn.setAttribute('disabled', 'true');
  }

  addItemsToCart() {
    this.setState({ loading: true });
    this.state.product ?
    this.props.add_to_cart(this.state.product)
    :
    this.setState({ loading: false });
  }

  finalize() {
    this.setState({ loading: false, itemAdded: true });
  }

  render() {
    const { product } = this.state;

    return (
      <div className="container">

        {
          this.state.loading ?
          (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )
          :
          <div></div>
        }

        <div className="row">
          <div className="input-field col s9">
            <input
              type="text"
              id="search-input"
              value={this.state.searchURL}
              onChange={(e) => this.onSearchTermChanged(e.target.value)}
              placeholder="Enter Amazon URL"
            />
            <p className="important-msg"><b>{this.state.urlError}</b></p>
          </div>

          <div className="col s3">
            <Button
              className="search-btn"
              waves='light'
              onClick={this.onSearch.bind(this)}
              id="search-btn">
                Search
            </Button>
          </div>
        </div>

        {product ?
        (
          <div>
            <h5>{product.title}</h5>
            <div className="row">
              <div className="col s4">
                <div className="image-container card">
                  <img alt={`${product.title}`} src={product.image} width="180" />
                  <br />

                  {
                    this.state.itemAdded ?
                    <p><b>Item added to Cart</b></p>
                    :
                    this.state.itemInCart ?
                    <p><b>Item in Cart</b></p>
                    :
                    (
                      <Button
                        waves='light'
                        onClick={this.addItemsToCart.bind(this)}
                        className="search-btn">
                          Add to Cart
                      </Button>
                    )
                  }
                </div>
              </div>

              <div className="col s8 card">
                <h5><b>Price: {product.price}</b></h5>
                {
                  product.description ?
                  <p><b>Description: </b>{product.description.trim()}</p>
                  :
                  ''
                }
                <p><b>Details: </b></p>
                {
                  product.details.map((detail, index) => {
                    return <p key={index}>{detail}</p>
                  })
                }
              </div>
            </div>
          </div>
        )
        :
        <div className="home-container">
          
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems,
    cartIds: state.cartIds
  }
}

export default connect(mapStateToProps, { add_to_cart, get_user })(Home);