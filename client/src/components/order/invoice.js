import React, { Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-materialize';
import StripeCheckout from 'react-stripe-checkout';

import { getInvoice } from '../../helpers/api';

class Invoice extends Component {
  state = {
    invoice: null,
    makePayment: false
  }

  componentDidMount() {
    const invoiceId = this.props.match.params.id;

    getInvoice(invoiceId)
    .then(res => res.json())
    .then(res => {
      this.setState({ invoice: res });
    })
    .catch(err => console.log(`Error reported: ${err}`))
  }

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    const { invoice } = this.state;

    return (
      <Container>
        <Row className="left-algin">
          <Col><h5>View Invoice</h5></Col>
        </Row>
        {
          this.state.invoice ?
          <div>
            <Card>
              <Row>
                <Col>
                  <p><b>Invoice#:</b> {invoice._id}</p>
                </Col>
              </Row>

              <Row className="left-align">
                <Col s={10}>
                  <p><b>ITEM</b></p>
                </Col>

                <Col s={2}>
                <p><b>PRICE</b></p>
                </Col>
              </Row>

              {
                invoice.items.map(item => {
                return (
                  <Row className="left-align" key={item._id}>
                    <Col s={10}>
                      <p>{item.name}</p>
                    </Col>

                    <Col s={2}>
                      <p>{item.price}</p>
                    </Col>
                  </Row>
                )
                })
              }

              <hr />
              
              <Row className="left-align">
                <Col s={10}><p><b>Subtotal:</b></p></Col>

                <Col s={2}>
                  <p>${(invoice.total - invoice.fee).toFixed(2)}</p>
                </Col>
              </Row>
              <Row className="left-align">
                <Col s={10}><p><b>Hourrier Fee:</b></p></Col>

                <Col s={2}>
                  <p>${invoice.fee}</p>
                </Col>
              </Row>
              <Row className="left-align">
                <Col s={10}><p><b>Total:</b></p></Col>

                <Col s={2}>
                  <p>${invoice.total}</p>
                </Col>
              </Row>
            </Card>
            
            <Row>
              <Col s={12}>
                <StripeCheckout
                  token={this.onToken}
                  stripeKey="sk_test_ZWzRE7nXIe6cXE0n9r3S2US"
                />
              </Col>
            </Row>
            
          </div>
          :
          ''
        }
      </Container>
    )
  }
}

export default Invoice;