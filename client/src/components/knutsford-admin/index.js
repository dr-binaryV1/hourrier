import React, { Component } from 'react';
import { Container } from 'react-materialize';

import { getKnutsfordItems } from '../../helpers/api';

class KnutsfordDashboard extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    getKnutsfordItems()
    .then(res => res.json())
    .then(res => {
      this.setState({ orders: res.orders })
    })
    .catch(err => console.log(`Error reported: ${err}`))
  }

  render() {
    return (
      <Container>
        <h5>Knutsford Panel</h5>
      </Container>
    )
  }
}

export default KnutsfordDashboard;