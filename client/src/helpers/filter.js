import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import Select2 from 'react-select2-wrapper';
import { filter_orders } from '../actions';
import { connect } from 'react-redux';
import { filterBy, arrivalCity, arrivalDate } from '../utils/appData';

class Filter extends Component {
  state = {
    searchName: '',
    filterOption: 'Name'
  }

  render() {
    return (
      <Row>
        <Col s={3} className="right-align">
          <Select2
            required={true}
            id="filter"
            defaultValue="Name"
            value={this.state.filterOption}
            onSelect={(e) => this.setState({ filterOption: e.target.value })}
            data={filterBy}
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
            onSelect={(e) => {
              this.state.filterOption === "Traveler Arrival Destination" ?
                this.props.filter_orders("location", e.target.value)
                :
                this.state.filterOption === "Traveler Arrival Date" ?
                  this.props.filter_orders("time", e.target.value)
                  : ''
              }
            }
            data={
              this.state.filterOption === "Traveler Arrival Destination" ?
                arrivalCity
                :
                this.state.filterOption === "Traveler Arrival Date" ?
                  arrivalDate
                  : []
            }
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
            label="Search by Name or click SEARCH to find all"
            s={12}
            value={this.state.searchName}
            onChange={(e) => this.setState({ searchName: e.target.value })}
            id="searchName"
            validate={true} />
        </Col>

        <Col s={2} className="left-align">
          <Button
            onClick={() => this.props.filter_orders("name", this.state.searchName)}
            className="search-btn blue"
            waves="light">
            Search
          </Button>
        </Col>
      </Row>
    )
  }
}

export default connect(null, { filter_orders })(Filter);
