import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Container, Row, Col, Button, ProgressBar } from 'react-materialize';
import Moment from 'moment';

import {
  getSingleOrder,
  orderPurchased,
  findTraveler,
  sendInvoice
} from '../../helpers/api';
import Item from './item';

class OrderDetail extends Component {
  state = {
    buyer: null,
    traveler: null,
    travelItinerary: null,
    shippingAddress: null,
    items: [],
    status: null,
    loading: false,
    lastUpdated: Date.now(),
    totalCost: 0.00,
    hourrierFee: 50
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? ''
      :
      ''
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const orderId = this.props.match.params.id;

    getSingleOrder(orderId)
      .then(res => res.json())
      .then(res => {
        this.setState({
          buyer: res.buyer,
          traveler: res.traveler,
          shippingAddress: res.shipping,
          travelItinerary: res.itinerary,
          items: res.items,
          status: res.status,
          lastUpdated: res.updatedAt
        });
      })
      .then(() => {
        this.calculateTotalPrice()
      })
      .catch(err => console.log(`Error reported: ${err}`))
  }

  findTraveler() {
    const orderId = this.props.match.params.id;
    findTraveler(orderId, this.state.items)
      .then(res => res.json())
      .then(res => this.setState({ status: res.status, items: this.state.items }))
      .catch(err => console.log(`Error reported: ${err}`))
  }

  calculateTotalPrice() {
    const { items, hourrierFee } = this.state;
    let tempTotalPrice = 0;

    items.map(item => {
      tempTotalPrice = tempTotalPrice + parseFloat(item.price.substr(1));
    });

    this.setState({ totalCost: tempTotalPrice + hourrierFee });
  }

  sendInvoice() {
    const invoice = {
      orderId: this.props.match.params.id,
      buyerId: this.state.buyer._id,
      items: this.state.items,
      fee: this.state.hourrierFee,
      total: this.state.totalCost
    };

    sendInvoice(invoice)
      .then(res => res.json())
      .then(res => {
        this.setState({ status: res.status })
      })
      .catch(err => console.log(`Error reported: ${err}`))
  }

  orderPurchased() {
    const orderId = this.props.match.params.id;

    orderPurchased(orderId)
      .then(res => res.json())
      .then(res => {
        this.setState({ status: res.status })
      })
      .catch(err => console.log(`Error reported: ${err}`))
  }

  render() {
    const { buyer, traveler, travelItinerary, shippingAddress, items, status, lastUpdated } = this.state;
    const ONE_DAY = 60 * 60 * 1000 * 24;
    return (
      <Container>
        {
          buyer ?
            <div>
              <h5 className="left-align">Buyer's Information</h5>
              <Card>
                <Row>
                  <Col s={3} className="left-align">
                    <p><b>First Name: </b>{buyer.firstname}</p>
                  </Col>

                  <Col s={3} className="left-align">
                    <p><b>Last Name: </b>{buyer.lastname}</p>
                  </Col>

                  <Col s={6} className="left-align">
                    <p><b>Email: </b>{buyer.email}</p>
                  </Col>
                </Row>

                <Row>
                  <Col s={6} className="left-align">
                    <p><b>Mailing Address 1: </b>{buyer.mailingAddress1}</p>
                  </Col>

                  <Col s={6} className="left-align">
                    <p><b>Mailing Address 2: </b>{buyer.mailingAddress2}</p>
                  </Col>
                </Row>

                <Row>
                  <Col s={3} className="left-align">
                    <p><b>Mailing City: </b>{buyer.mailingCity}</p>
                  </Col>

                  <Col s={3} className="left-align">
                    <p><b>Mailing Country: </b>{buyer.mailingCountry}</p>
                  </Col>

                  <Col s={3} className="left-align">
                    <p><b>Mailing Zip: </b>{buyer.mailingZip}</p>
                  </Col>
                </Row>

                <Row>
                  <Col className="left-align">
                    <p><b>Status: </b>{this.state.status}</p>
                  </Col>
                </Row>

                <Row>
                  <Col className="left-align">
                    {
                      this.state.status === 'traveler found' ?
                        <Button
                          onClick={this.sendInvoice.bind(this)}
                          className="btn-spacing"
                          waves='light'>
                          Send Invoice
                      </Button>
                        :
                        this.state.status === 'invoice paid' ?
                          <Button
                            onClick={this.orderPurchased.bind(this)}
                            className="btn-spacing"
                            waves='light'>
                            Item Purchased
                        </Button>
                          :
                          this.state.status === 'invoice sent' ?
                            <Button
                              className="btn-spacing"
                              disabled={true}
                              waves='light'>
                              Send Invoice
                        </Button>
                            :
                            ''
                    }
                  </Col>
                </Row>
              </Card>

              {
                this.state.status !== 'pending' && this.state.status !== 'locating travelers' ?
                  <div>
                    <h5 className="left-align">Traveler's Information</h5>
                    <Card>
                      <Row>
                        <Col s={3} className="left-align">
                          <p><b>First Name: </b>{traveler.firstname}</p>
                        </Col>

                        <Col s={3} className="left-align">
                          <p><b>Last Name: </b>{traveler.lastname}</p>
                        </Col>

                        <Col s={6} className="left-align">
                          <p><b>Email: </b>{traveler.email}</p>
                        </Col>
                      </Row>

                      <Row>
                        <Col s={6} className="left-align">
                          <p><b>Shipping Address 1: </b>{shippingAddress.shippingAddress1}</p>
                        </Col>

                        <Col s={6} className="left-align">
                          <p><b>Shipping Address 2: </b>{shippingAddress.shippingAddress2}</p>
                        </Col>
                      </Row>

                      <Row>
                        <Col s={3} className="left-align">
                          <p><b>Shipping City: </b>{shippingAddress.shippingCity}</p>
                        </Col>

                        <Col s={3} className="left-align">
                          <p><b>Shipping Country: </b>{shippingAddress.shippingCountry}</p>
                        </Col>

                        <Col s={3} className="left-align">
                          <p><b>Shipping Zip: </b>{shippingAddress.shippingZip}</p>
                        </Col>
                      </Row>

                      <hr />

                      {
                        travelItinerary.map(itinerary => {
                          return <Row>
                            <Col s={3} className="left-align">
                              <p><b>Arrival City: </b>{itinerary.arrivalCity}</p>
                            </Col>

                            <Col s={3} className="left-align">
                              <p><b>Arrival Date: </b>{new Date(itinerary.arrivalDate).toLocaleDateString()}</p>
                            </Col>

                            <Col s={6} className="left-align">
                              <p><b>Arrival Time: </b>{itinerary.arrivalTime}</p>
                            </Col>
                          </Row>
                        })
                      }
                    </Card>
                  </div>
                  :
                  ''
              }

              <h5 className="left-align">Requested Items --- Total Cost: ${this.state.totalCost.toFixed(2)}</h5>
              {
                items.map(item => {
                  return (
                    <Item item={item} key={item._id} getItems={this.getItems.bind(this)} />
                  )
                })
              }

              {
                status == 'locating travelers' && Date.now() - new Date(lastUpdated).getMilliseconds() >= ONE_DAY ?
                  <Button
                    onClick={this.findTraveler.bind(this)}
                    waves="light">
                    Find Travelers
                </Button>
                  :
                  ''
              }
            </div>
            :
            ''
        }
      </Container>
    )
  }
}

export default withRouter(OrderDetail);
