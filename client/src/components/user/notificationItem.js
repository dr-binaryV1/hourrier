import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import { withRouter, Link } from 'react-router-dom';

class NotificationItem extends Component {
  state = {
    viewDetails: false
  }

  render() {
    const { notification } = this.props;

    return (
      <Card className="left-align">
        <Row>
          <Col s={2}>
            <img src="images/package.jpg" alt="package" width="70" />
          </Col>

          <Col s={4}>
            <p><b>{notification.subject}</b></p>
            <p>{notification.details}</p>
          </Col>

          <Col s={6} className="right-align">
            <Button
              onClick={() => this.setState({ viewDetails: !this.state.viewDetails })}
              className="btn-spacing"
              waves="light">
              {this.state.viewDetails ? 'Hide Items' : 'Show Items'}
            </Button>

            <Button
              className="red"
              waves="light">
              Dismiss
            </Button>
          </Col>
        </Row>

        {
          this.state.viewDetails ?
          <Row>
            <div>
              <p>Items in this package:</p>
            {
              notification.items.map(item => {
                return <Card key={notification._id}>
                  <Row>
                    <Col s={1} className="left-align">
                      <img src={item.image} alt="product logo" width="50" />
                    </Col>
                    <Col s={8}>{item.name}</Col>
                    <Col s={3} className="right-align"><Link to={item.url} target="_blank">View Product</Link></Col>
                  </Row>
                </Card>;
              })
            }
            </div>
          </Row>
          : ''
        }
      </Card>
    )
  }
}

export default withRouter(NotificationItem);
