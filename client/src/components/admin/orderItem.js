import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { delete_order } from '../../actions';
import Moment from 'moment';
import AccessTime from 'react-icons/lib/md/access-time';

const OrderItem = (props) => {
  const { order } = props;

  return (
    <Card className="col s5 order-card">
      <Row>
        <Col s={4} className="col s12">
          <p><b>Order Id:</b> {order._id}</p>
        </Col>

        <Col s={3} className="col s12">
          <p><b>Status:</b> {order.status}</p>
        </Col>

        <Col s={5} className="col s12">
          

          {/* <Button
            onClick={() => props.delete_order(order._id)}
            className="red"
            waves="light">
            Delete
          </Button> */}
          <p className="small-top-margin"><b>Last Updated: </b><AccessTime /> {Moment(order.updatedAt).fromNow()}</p>
        </Col>
      </Row>
      <Row>
        <Button
          onClick={() => props.history.push(`/hourrier-admin/orders/${order._id}`)}
          className="btn-spacing order-btn"
          waves="light">
          View
        </Button>
      </Row>
    </Card>
  )
}

export default withRouter(connect(null, { delete_order })(OrderItem));