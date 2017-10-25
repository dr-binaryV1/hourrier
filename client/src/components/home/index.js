import React, { Component } from 'react';
import {
  addItemToCart,
  searchAmazon,
  checkItem
} from '../../helpers/api';

class Home extends Component {
  state = {
    searchURL: '',
    loading: false,
    itemAdded: null,
    itemInCart: null,
  }

  componentDidMount() {
    document.getElementById('search-btn').setAttribute('disabled', 'true');
  }

  onSearch() {
    console.log('searching...');
    const searchBtn = document.getElementById('search-btn');
    searchBtn.setAttribute('disabled', 'true');
    searchBtn.innerText = "Searching...";

    const searchInput = document.getElementById('search-input');
    searchInput.setAttribute('readonly', 'true');

    this.setState({ loading: true });

    searchAmazon({ url: this.state.searchURL })
    .then(res => res.json())
    .then(res => {
      searchBtn.removeAttribute('disabled');
      searchBtn.innerText = "Search";

      searchInput.removeAttribute('readonly');
      this.setState({ loading: false, product: res, itemAdded: false });

      checkItem({ itemName: res.title })
        .then(res => res.json())
        .then(res => this.setState({ itemInCart: res.itemFound }))
        .catch(err => console.log(`Error reported: ${err}`));
    })
    .catch(err => {
      console.log(`Error reported: ${err}`);
      this.setState({ loading: false });
    });
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
    addItemToCart(this.state.product)
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false, itemAdded: true });
      })
      .catch(err => {
        console.log(`Error reported: ${err}`);
        this.setState({ loading: false });
      })
    :
    this.setState({ loading: false });
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
          </div>

          <div className="col s3">
            <button
              className="waves-effect waves-light btn search-btn"
              onClick={this.onSearch.bind(this)}
              id="search-btn">
                Search
            </button>
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
                      <button
                        onClick={this.addItemsToCart.bind(this)}
                        className="waves-effect waves-light btn search-btn">
                          Add to Cart
                      </button>
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
        ''
        }
      </div>
    )
  }
}

export default Home;