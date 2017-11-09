import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize';

const NotificationItem = (props) => {
  return (
    <Card className="left-align">
      <Row>
        <Col s={2}>
          <img src="images/package.jpg" alt="package" width="70" />
        </Col>

        <Col s={4}>
          <p><b>{props.notification.subject}</b></p>
          <p>{props.notification.details}</p>
        </Col>

        <Col s={6} className="right-align">
          <Button
            className="btn-spacing"
            waves="light">
            View
          </Button>

          <Button
            className="red"
            waves="light">
            Dismiss
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default NotificationItem;