import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import AccessTime from 'react-icons/lib/md/access-time';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'moment';

const InvoiceNotification = (props) => {
  const { notification } = props;

  return (
    <Card className="left-align">
      <Row>
        <Col s={2}>
          <img src="images/invoice.jpg" alt="package" width="70" />
        </Col>

        <Col s={4}>
          <p><b>{notification.subject}</b></p>
          <p>{notification.details}</p>
        </Col>

        <Col s={6} className="right-align">
          <Button
            onClick={() => props.history.push(`/orders/invoice/${notification.invoiceId}`)}
            className="btn-spacing"
            waves="light">
            View
          </Button>
          <br />
          <p className="right-align small-top-margin"><AccessTime /> {Moment(notification.createdAt).fromNow()}</p>
        </Col>
      </Row>
    </Card>
  )
}

export default withRouter(InvoiceNotification);
