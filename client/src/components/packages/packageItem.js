import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import AccessTime from 'react-icons/lib/md/access-time';
import Moment from 'moment';

import { getPackage } from '../../helpers/api';

class PackageItem extends Component {
  state = {
    item: null,
    viewItems: false
  }

  componentDidMount() {
    getPackage(this.props.id)
    .then(res => res.json())
    .then(res => {
      this.setState({ item: res })
    })
    .catch(err => console.log(`Error reported: ${err}`))
  }

  render() {
    const { item } = this.state;

    return (
      <Card>
        <Row className="left-align">
          <Col s={12}>
            <p><b>Package #:</b> {item ? item._id : ''}</p>
          </Col>
        </Row>

        <Row>
          <Col s={3}>
            <img src="images/package.jpg" alt="package" width="70" />
            <p className="right-align small-top-margin"><b>Accepted: </b><AccessTime /> {Moment(item? item.createdAt: Date.now()).fromNow()}</p>
          </Col>

          <Col s={6} className="center-align">
            <p><b>Status: </b>{item ? item.status: ''}</p>
            <p><b>Details: </b> This Package contains {item ? item.items.length: 0} Item(s)</p>
            <Button
              className="green"
              waves='light'>
              Package Received
            </Button>
          </Col>

          <Col s={3} className="right-align">
            <Button
              onClick={() => this.setState({ viewItems: !this.state.viewItems })}
              waves='light'>
              {this.state.viewItems ? 'Hide Items' : 'Show Items'}
            </Button>
          </Col>
        </Row>

        {
          this.state.viewItems ?
          <Row>
            <div>
              <p>Items in this Package:</p>
              {
                item ?
                item.items.map(item => {
                  return <Card key={item._id}>
                    <Row>
                      <Col s={1} className="left-align">
                        <img src={item.image} alt="product logo" width="50" />
                      </Col>
                      <Col s={8}>{item.name}</Col>
                      <Col s={3} className="right-align"><Link to={item.url} target="_blank">View Product</Link></Col>
                    </Row>
                  </Card>;
                })
                : ''
              }
            </div>
          </Row>
          :
          ''
        }
      </Card>
    )
  }
};

export default PackageItem;