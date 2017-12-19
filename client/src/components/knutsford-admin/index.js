import React, { Component } from 'react';
import { Container } from 'react-materialize';
import Item from './item';

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
        {
          this.state.orders.length > 0 ?
          this.state.orders.map(order => {
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