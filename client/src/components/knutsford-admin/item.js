import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import Moment from 'moment';
import AccessTime from 'react-icons/lib/md/access-time';

class Item extends Component {
  state = {
    loading: false,
    package: null,
    traveler: null
  }

  componentDidMount() {
    this.getPackage();
    this.getTraveler();
  }

  getPackage() {

  }

  getTraveler() {

  }

  render() {
    const { order } = this.props;

    return (
      <Card>
        <Row>
          <Col s={4}>
            <p><b>Order Id: </b>{order._id}</p>
          </Col>

          <Col s={3}>
            <p><b>Status: </b>{order.status}</p>
          </Col>

          <Col s={5}>
            <p className="right-align small-top-margin"><b>Last Updated: </b><AccessTime /> {Moment(order.updatedAt).fromNow()}</p>
          </Col>
        </Row>

        <Row>

        </Row>
      </Card>
    )
  }
};

export default Item;