import React, { Component } from 'react';
import { Container, Row, Col, Input, Tabs, Tab, Button } from 'react-materialize';
import { get_orders } from '../../actions';
import { connect } from 'react-redux';
import Select2 from 'react-select2-wrapper';

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
            <Tab title="All Orders" active>
              <Row>
                <Col s={3} className="right-align">
                  <Select2
                    required={true}
                    id="filter"
                    //value={this.state.country}
                    data={['Location', 'Arrival']}
                    options={
                      {
                        placeholder: 'Please select method',
                      }
                    }
                  />
                  <label htmlFor="filter" className="active">Filter</label>
                </Col>

                <Col s={3} className="right-align">
                  <Select2
                    required={true}
                    id="filterOption"
                    //value={this.state.country}
                    data={[]}
                    options={
                      {
                        placeholder: 'Please select option',
                      }
                    }
                  />
                  <label htmlFor="filter" className="active">Filter Option</label>
                </Col>

                <Col s={4}>
                  <Input
                    label="Search by Name"
                    s={12}
                    id="searchName"
                    validate={true} />
                </Col>

                <Col s={2} className="left-align">
                  <Button
                    className="search-btn"
                    waves="light">
                    Search
                  </Button>
                </Col>
              </Row>
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