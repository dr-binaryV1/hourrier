import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { delete_travel_itinerary } from '../../actions';

class TravelItinerary extends Component {
  render() {
    const { itinerary } = this.props;

    return (
      <div className="row card container-padding">
        <div className="row">
          <div className="col s4 left-align">
            <p>Departure City: {itinerary.departureCity}</p>
          </div>
          <div className="col s4 left-align">
            <p>Departure Date: {new Date(itinerary.departureDate).toLocaleDateString()}</p>
          </div>
          <div className="col s4 left-align">
            <p>Departure Time: {itinerary.departureTime}</p>
          </div>
        </div>

        <div className="row">
          <div className="col s4 left-align">
            <p>Arrival City: {itinerary.arrivalCity}</p>
          </div>
          <div className="col s4 left-align">
            <p>Arrival Date: {new Date(itinerary.arrivalDate).toLocaleDateString()}</p>
          </div>
          <div className="col s4 left-align">
            <p>Arrival Time: {itinerary.arrivalTime}</p>
          </div>
        </div>

        <div className="row">
          <div className="col s4 right-align">
            <Button
              onClick={() => this.props.delete_travel_itinerary({itineraryId: itinerary._id})}
              className="red btn-spacing"
              waves='light'>Remove</Button>
            <Button
              //onClick={() => this.props.change_primary_shipping({primaryShippingAddress: address._id})}
              className="green"
              waves='light'>
              Primary
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { delete_travel_itinerary })(TravelItinerary);