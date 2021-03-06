import React, { Component } from 'react';
import { Card, Row, Col, Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_order_item } from '../../actions';

class Item extends Component {
  state = {
    editing: false,
    price: ''
  }

  componentDidMount() {
    this.setState({ price: this.props.item.price });
  }

  onItemSave() {
    this.setState({ editing: false });

    const newItem = {
      _id: this.props.item._id,
      price: this.state.price
    };

    this.state.price !== this.props.item.price ?
    this.props.update_order_item(newItem)
    :
    ''
    this.props.getItems();
  }

  render() {
    const { item } = this.props;

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
            {
              this.state.editing ?
              this.state.price ?
              <Input
                label="Price"
                defaultValue={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
                validate={true} />
              :
              ''
              :
              <p><b>Price: </b>{this.state.price}</p>
            }
            <br />
            <Link
              to={item.url}
              target="_blank"
            >View Product</Link>
          </Col>

          <Col s={2} className="right-align">
            {
              this.state.editing ?
              <Button
                onClick={this.onItemSave.bind(this)}
                waves='light'>
                Save
              </Button>
              :
              <Button
                onClick={() => this.setState({ editing: true })}
                waves='light'>
                Edit
              </Button>
            }
          </Col>
        </Row>
      </Card>
    )
  }
}

export default connect(null, { update_order_item })(Item);
