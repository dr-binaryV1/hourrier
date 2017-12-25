import React, { Component } from 'react';
import { Container } from 'react-materialize';
import Item from './item';
import sortBy from 'sort-by';

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
    const { orders } = this.state;

    return (
      <Container>
        <h5>Knutsford Panel</h5>
        {
          orders.length > 0 ?
          orders.map(order => {
            return <Item key={order._id} order={order} />
          })
          :
          ''
        }
      </Container>
    )
  }
}

export default KnutsfordDashboard;