import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize';

const Item = props => {
  const { order } = props;
  
  return (
    <Card>
      <Row>
        <Col>
          <p><b>Id: </b>{order._id}</p>
        </Col>
      </Row>
    </Card>
  )
};

export default Item;