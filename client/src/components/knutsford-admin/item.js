import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import AccessTime from 'react-icons/lib/md/access-time';
import { getKnutsordData, getPackage, getUser, getItinerary } from '../../helpers/api';

class Item extends Component {
  state = {
    loading: false,
    viewItems: false,
    pkg: null,
    traveler: null,
    itinerary: null
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const { order } = this.props;
    getKnutsordData(order.packageId)
      .then(res => res.json())
      .then(res => {
        this.setState({ pkg: res.pkg, traveler: res.usr, itinerary: res.itinerary })
      })
      .catch(err => console.log(`Error reported ${err}`));
  }

  render() {
    const { order } = this.props;
    const { pkg, traveler, itinerary, viewItems } = this.state;

    return (
      <Card>
        <Row>
          <Col s={4} className="left-align">
            <p><b>Order Id: </b>{order._id}</p>
          </Col>

          <Col s={4}>
            <p><b>Status: </b>{order.status}</p>
          </Col>

          <Col s={4}>
            <p className="right-align small-top-margin"><b>Last Updated: </b><AccessTime /> {Moment(order.updatedAt).fromNow()}</p>
          </Col>
        </Row>

        {traveler ?
          <Row>
            <Col s={3} className="left-align">
              <p><b>Traveler Name: </b>{traveler.firstname} {traveler.lastname}</p>
            </Col>

            {itinerary ?
              <div>
                <Col s={3}>
                  <p><b>Arrival City: </b>{itinerary.arrivalCity}</p>
                </Col>

                <Col s={3}>
                  <p><b>Arrival Date: </b>{new Date(itinerary.arrivalDate).toLocaleDateString()}</p>
                </Col>

                <Col s={3}>
                  <p><b>Arrival Time: </b>{itinerary.arrivalTime}</p>
                </Col>
              </div>
              : ''
            }
          </Row>
          : ''
        }

        {pkg ?
          <Row>
            <Col s={4} className="left-align">
              <p><b>Package Status: </b>{pkg.status}</p>
            </Col>

            <Col s={4}>
              <Button
                onClick={() => this.setState({ viewItems: !viewItems })}
                waves="light">
                { viewItems ? 'Hide Items' : 'View Items'}
              </Button>
            </Col>

            <Col s={4} className="right-align">
              <Button
                //onClick={() => this.setState({ viewItems: !viewItems })}
                className="green"
                waves="light">
                Confirm Package
              </Button>
            </Col>
          </Row>
          : ''
        }

        {
          viewItems ?
            pkg.items.map(item => {
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
      </Card>
    )
  }
};

export default Item;