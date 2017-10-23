import React, { Component } from 'react';

class Home extends Component {
  state = {
    searchURL: ''
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s10">
            <input
              type="text"
              value={this.state.searchURL}
              onChange={(e) => this.setState({ searchURL: e.target.value })}
              placeholder="Enter Amazon URL"
            />
          </div>

          <div className="ol s2">
            <button className="waves-effect waves-light btn search-btn" id="search">Search</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;