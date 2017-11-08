import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-materialize';

import { getSingleOrder, findTraveler } from '../../helpers/api';

class OrderDetail extends Component {
  state = {
    buyer: null,
    items: [],
    status: null
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
    findTraveler(orderId)
    .then(res => res.json())
    .then(res => this.setState({ status: res.status }))
    .catch(err => console.log(`Error reported: ${err}`))
  }

  render() {
    const { buyer, items } = this.state;

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
                  <p><b>email: </b>{buyer.email}</p>
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
            </Card>

            <h5 className="left-align">Requested Items</h5>
            {
              items.map(item => {
                return (
                  <Card key={item._id}>
                    <Row>
                      <Col s={1} className="left-align">
                        <img 
                          src={item.image}
                          alt="product img"
                          width="50" />
                      </Col>

                      <Col s={9} className="left-align">
                        <p>{item.name}</p>
                        <p><b>Price: </b>{item.price}</p>
                        <Link
                          to={item.url}
                          target="_blank"
                        >View Product</Link>
                      </Col>
                    </Row>
                  </Card>
                )
              })
            }

            <Button
              onClick={this.findTraveler.bind(this)} 
              waves="light">
              Dispatch to Travelers
            </Button>
          </div>
          :
          ''
        }
      </Container>
    )
  }
}

export default withRouter(OrderDetail);