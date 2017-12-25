import React, { Component } from 'react';
import { Container, Row, Col, Input, Tabs, Tab } from 'react-materialize';
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
          </Col>
        </Row>
        <Row>
          <Tabs className='z-depth-1'>
            <Tab title="All Orders">
              {
                orders ?
                  reverseOrders.map(order => {
                    return <OrderItem key={order._id} order={order} />
                  })
                  :
                  ''
              }
            </Tab>
            <Tab title="Pending Purchases"></Tab>
            <Tab title="Completed Orders"></Tab>
          </Tabs>
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