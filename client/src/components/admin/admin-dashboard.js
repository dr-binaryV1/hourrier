import React, { Component } from 'react';
import { Container, Row, Col, Input, Tabs, Tab, Button } from 'react-materialize';
import { get_orders } from '../../actions';
import { connect } from 'react-redux';
import Select2 from 'react-select2-wrapper';
import Filter from '../../helpers/filter';

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
      <div className="admin-page row">
        <div className="left-menu col s2">
        <Tabs className='z-depth-1'>
              <Tab title="All Orders" active></Tab>
              <Tab title="Pending Purchases"></Tab>
              <Tab title="Completed Orders"></Tab>
            </Tabs>
        </div>
        <div className="right-menu col s10">
          {/* <Row className="left-align">
            <Col s={4} className="left-align">
            </Col>
          </Row> */}
          <Row>
                <div className="admin-filter"><Filter /></div>
                {
                  orders ?
                    reverseOrders.map(order => {
                      return <OrderItem key={order._id} order={order} />
                    })
                    :
                    ''
                }
          </Row>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps, { get_orders })(Dashboard);