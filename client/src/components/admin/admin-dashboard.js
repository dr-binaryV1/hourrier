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
    
    return (
      <Container>
        <Row>
          <Tabs className="z-depth-1">
            <Tab title="Open Orders" active>
              <h5>Open Orders: </h5>
              {
                orders ?
                orders.map(order => {
                  return <OrderItem key={order._id} order={order} />
                })
                :
                ''
              }
            </Tab>
            <Tab title="Closed Orders"></Tab>
            <Tab title="Open Itinerary requests"></Tab>
            <Tab title="Closed Itinerary request"></Tab>
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