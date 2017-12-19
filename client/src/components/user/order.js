import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import AccessTime from 'react-icons/lib/md/access-time';
import Moment from 'moment';

const Order = props => {
    const { order } = props;
    return (
      <Card>
        <Row className="left-align">
          <Col s={4}>
            <p><b>Order Id: </b>{order._id}</p>
          </Col>
          <Col s={4}>
            <p><b>Status: </b>{order.status}</p>
          </Col>
          <Col s={4}>
            <Button
              waves='light'>
              View Details
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <p><b>Order Placed: </b><AccessTime /> {Moment(order.createdAt).fromNow()}</p>
          </Col>
        </Row>
      </Card>
    )
}

export default Order;