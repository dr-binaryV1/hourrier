import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';

const OrderItem = (props) => {
  const { order } = props;

  return (
    <Card>
      <Row>
        <Col s={6} className="left-align">
          <p><b>Order Id:</b> {order._id}</p>
        </Col>

        <Col s={3} className="left-align">
          <p><b>Status:</b> {order.status}</p>
        </Col>

        <Col s={3} className="right-align">
          <Button
            onClick={() => props.history.push(`/hourrier-admin/orders/${order._id}`)}
            waves="light">
          View Details</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default withRouter(OrderItem);