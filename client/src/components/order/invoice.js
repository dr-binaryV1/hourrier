import React, { Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-materialize';
import StripeCheckout from 'react-stripe-checkout';
import { dismiss_invoice } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getInvoice, saveStripeToken } from '../../helpers/api';

class Invoice extends Component {
  state = {
    invoice: null,
    makePayment: false,
    paymentStatus: null
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
    const invoiceId = this.props.match.params.id;
    const { invoice } = this.state;
    const amount = invoice.total * 100;
    saveStripeToken(token, amount, invoiceId)
    .then(res => res.json())
    .then(res => {
        this.setState({ paymentStatus: res.status });
    })
    .catch(err => console.log(`Error reported: ${err}`))
  }

  onDismiss() {
    const invoiceId = this.props.match.params.id;
    this.props.dismiss_invoice(invoiceId);
    this.props.history.push('/notifications');
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
              <Row className="left-align">
                <Col s={4}>
                  <p><b>Invoice ID:</b> {invoice._id}</p>
                </Col>

                <Col s={4}>
                  <p><b>Status:</b> {invoice.status}</p>
                </Col>
              </Row>

              <Row className="left-align">
                <Col s={10}>
                  <p><b>ITEM(S)</b></p>
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
                {
                  invoice.status !== 'paid' ?
                  this.state.paymentStatus === null || this.state.paymentStatus !== 'succeeded' ?
                  <StripeCheckout
                    token={this.onToken}
                    amount={(invoice.total * 100)} // cents
                    stripeKey="pk_test_9bS8hhbAgrv0dQSR0IBDsGKD"
                  />
                  :
                  this.state.paymentStatus === 'succeeded' ?
                  <p className="success-msg"><b>Thank you for using Hourrier Services. Payment was successful</b></p>
                  :
                  <p className="important-msg"><b>Unfortunately, there was an issue processing the card you provided.</b></p>
                  :
                  <div>
                    <p className="success-msg"><b>Invoice Paid. Package will be shipped in 1 - 3 Business Days.</b></p>
                    <Button
                      onClick={this.onDismiss.bind(this)}
                      className="red"
                      waves='light'>
                      Dismiss from Notifications  
                    </Button>
                  </div>
                }
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

export default withRouter(connect(null, { dismiss_invoice })(Invoice));