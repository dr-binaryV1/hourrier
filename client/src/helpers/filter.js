import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import Select2 from 'react-select2-wrapper';
import { filter_orders } from '../actions';
import { connect } from 'react-redux';

class Filter extends Component {
  state = {
    searchName: ''
  }

  render() {
    return (
      <Row>
        <Col s={3} className="right-align">
          <Select2
            required={true}
            id="filter"
            data={['Location', 'Arrival']}
            options={
              {
                placeholder: 'Please select method',
              }
            }
          />
          <label htmlFor="filter" className="active">Filter</label>
        </Col>

        <Col s={3} className="right-align">
          <Select2
            required={true}
            id="filterOption"
            data={[]}
            options={
              {
                placeholder: 'Please select option',
              }
            }
          />
          <label htmlFor="filter" className="active">Filter Option</label>
        </Col>

        <Col s={4}>
          <Input
            label="Search by Name"
            s={12}
            value={this.state.searchName}
            onChange={(e) => this.setState({ searchName: e.target.value })}
            id="searchName"
            validate={true} />
        </Col>

        <Col s={2} className="left-align">
          <Button
            onClick={() => this.props.filter_orders("name", this.state.searchName)}
            className="search-btn"
            waves="light">
            Search
          </Button>
        </Col>
      </Row>
    )
  }
}

export default connect(null, { filter_orders })(Filter);