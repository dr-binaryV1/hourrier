import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-materialize';
import Moment from 'moment';
import AccessTime from 'react-icons/lib/md/access-time';
import { getPackage, getUser, getItinerary } from '../../helpers/api';

class Item extends Component {
  state = {
    loading: false,
    package: null,
    traveler: null,
    itinerary: null
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const { order } = this.props;
    getPackage(order.packageId)
      .then(res => res.json())
      .then(res => {
        this.setState({ pkg: res });
        getUser(res.travelerId)
          .then(res => res.json())
          .then(res => {
            this.setState({ traveler: res })
            const data = { itineraryIds: res.itineraryIds };
            getItinerary(data)
              .then(res => res.json())
              .then(res => {
                this.setState({ itinerary: res.travelItinerary[0] })
              })
              .catch(err => console.log(`Error reported: ${err}`))
          })
          .catch(err => console.log(`Error reported: ${err}`))
      })
      .catch(err => console.log(`Error reported: ${err}`))
  }

  render() {
    const { order } = this.props;
    const { pkg, traveler, itinerary } = this.state;

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

        { traveler ?
          <Row>
            <Col s={3} className="left-align">
              <p><b>Traveler Name: </b>{traveler.firstname} {traveler.lastname}</p>
            </Col>

            { itinerary ?
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

        { pkg ?
          <Row>
            <Col s={4} className="left-align">
              <p><b>Package Status: </b>{pkg.status}</p>
            </Col>

            <Col s={4}>
              <Button
                waves="light">
                View Items
              </Button>
            </Col>
          </Row>
          : ''
        }
      </Card>
    )
  }
};

export default Item;