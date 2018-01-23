import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_travel_itinerary } from '../../actions';
import { Button, ProgressBar, Input } from 'react-materialize';
import Select2 from 'react-select2-wrapper';
import { countries } from '../../utils/appData';
import FlightTakeoff from 'react-icons/lib/md/flight-takeoff';

class AddItinerary extends Component {
  state = {
    departureCity: '',
    departureDate: '',
    departureTime: '',
    arrivalCity: '',
    arrivalDate: '',
    arrivalTime: '',
    flightNo: '',
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? ''
      :
      this.finalize()
  }

  onSubmitItinerary() {
    this.setState({ loading: true });
    const newItinerary = {
      departureCity: this.state.departureCity,
      departureDate: this.state.departureDate,
      departureTime: this.state.departureTime,
      arrivalCity: this.state.arrivalCity,
      arrivalDate: this.state.arrivalDate,
      arrivalTime: this.state.arrivalTime,
      flightNo: this.state.flightNo
    };
    this.props.add_travel_itinerary(newItinerary);
  }

  finalize() {
    this.setState({ loading: false });
    this.props.done();
  }

  render() {
    return (
      <div >
        {
          this.state.loading ? <ProgressBar /> : ''
        }

        <div className="row center-align container-padding">
          <div className="col s12">
            <h5>Add Travel Itinerary</h5>
          </div>
        </div>

        <div className="row profile-section container-padding">
          <div className="col s4 left-side left">
            <FlightTakeoff size={300} />
          </div>
          <div className="col s8 right-side right">
            <div className="row">
              <div className="col s4">
                <Input
                  label="Flight Number"
                  s={12}
                  id="flightNumber"
                  value={this.state.flightNo}
                  onChange={(e) => this.setState({ flightNo: e.target.value })}
                  validate={true} />
              </div>
              <div className="col s4">
                <Select2
                  required={true}
                  id="country"
                  //value={this.state.country}
                  data={countries}
                  options={
                    {
                      placeholder: 'Please select a country',
                    }
                  }
                />
              </div>

              <div className="col s4">
                <Select2
                  required={true}
                  id="state"
                  //value={this.state.country}
                  data={[]}
                  options={
                    {
                      placeholder: 'Please select a state',
                    }
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="col s4">
                <Input
                  label="Departure City"
                  s={12}
                  id="departureCity"
                  value={this.state.departureCity}
                  onChange={(e) => this.setState({ departureCity: e.target.value })}
                  validate={true} />
              </div>

              <div className="col s4">
                <Input
                  type="date"
                  label="Departure Date"
                  s={12}
                  id="departureDate"
                  value={this.state.departureDate}
                  onChange={(e) => this.setState({ departureDate: e.target.value })}
                />
              </div>

              <div className="col s4">
                <Input
                  type="time"
                  label="Departure Time"
                  s={12}
                  id="departureTime"
                  value={this.state.departureTime}
                  onChange={(e) => this.setState({ departureTime: e.target.value })}
                  validate={true} />
              </div>
            </div>

            <div className="row">
              <div className="col s4">
                <Input
                  label="Arrival City"
                  s={12}
                  id="arrivalCity"
                  value={this.state.arrivalCity}
                  onChange={(e) => this.setState({ arrivalCity: e.target.value })}
                  validate={true} />
              </div>

              <div className="col s4">
                <Input
                  type="date"
                  label="Arrival Date"
                  s={12}
                  id="arrivalDate"
                  value={this.state.arrivalDate}
                  onChange={(e) => this.setState({ arrivalDate: e.target.value })}
                />
              </div>

              <div className="col s4">
                <Input
                  type="time"
                  label="Arrival Time"
                  s={12}
                  id="arrivalTime"
                  value={this.state.arrivalTime}
                  onChange={(e) => this.setState({ arrivalTime: e.target.value })}
                  validate={true} />
              </div>
            </div>
          </div>
          <div className="col s12">
            <Button
              onClick={this.onSubmitItinerary.bind(this)}
              className="btn-spacing"
              waves='light'
              id="add-shipping">Save</Button>

            <Button
              onClick={() => this.props.cancel()}
              className="red"
              waves='light'
              id="cancel-add-shipping">Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    travelItinerary: state.travelItinerary
  }
}

export default connect(mapStateToProps, { add_travel_itinerary })(AddItinerary);