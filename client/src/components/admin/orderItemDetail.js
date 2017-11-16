import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Container, Row, Col, Button, ProgressBar } from 'react-materialize';

import { getSingleOrder, findTraveler } from '../../helpers/api';
import Item from './item';

class OrderDetail extends Component {
  state = {
    buyer: null,
    items: [],
    status: null,
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? '' 
    :
    ''
  }

  componentDidMount() {
    const orderId = this.props.match.params.id;

    getSingleOrder(orderId)
    .then(res => res.json())
    .then(res => {
      this.setState({ buyer: res.buyer, items: res.items, status: res.status })
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

  render() {
    const { buyer, items, status } = this.state;

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
                        waves='light'>
                        Send Invoice
                      </Button>
                       :
                       this.state.status === 'invoice sent' ?
                       <p><b>Invoice sent to buyer</b></p>
                       :
                       ''
                    }
                  </Col>
                </Row>
            </Card>

            <h5 className="left-align">Requested Items</h5>
            {
              items.map(item => {
                return (
                  <Item item={item} key={item._id} />
                )
              })
            }

            {
              status !== 'pending' ?
                <Button
                  onClick={this.findTraveler.bind(this)}
                  disabled={true}
                  waves="light">
                  Find Travelers
                </Button>
              :
                <Button
                  onClick={this.findTraveler.bind(this)}
                  waves="light">
                  Find Travelers
              </Button>
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