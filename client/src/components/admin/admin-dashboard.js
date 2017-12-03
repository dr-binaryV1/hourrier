import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'react-materialize';
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
        <Row className="left-align">
          <Col s={4} className="left-align">
            <h5>Open Orders: </h5>
          </Col>
        </Row>
        <Row>
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