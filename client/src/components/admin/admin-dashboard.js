import React, { Component } from 'react';
import { Container, Row, Tabs, Tab } from 'react-materialize';
import { get_orders } from '../../actions';
import { connect } from 'react-redux';

import OrderItem from './orderItem';

class Dashboard extends Component {
  componentDidMount() {
    this.props.get_orders();
  }

  render() {
    const { orders } = this.props;
    let reverseOrders = [];

    orders ? reverseOrders = orders.reverse() : '';
    
    return (
      <Container>
        <Row>
          <h5>Open Orders: </h5>
          {
            orders ?
            reverseOrders.map(order => {
              return <OrderItem key={order._id} order={order} />
            })
            :
            ''
          }
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps, { get_orders })(Dashboard);