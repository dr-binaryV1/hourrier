import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { delete_travel_itinerary } from '../../actions';
import TrashBin from 'react-icons/lib/md/delete';
import $ from 'jquery';

class TravelItinerary extends Component {
  componentDidMount() {
    $(document).ready(function () {
      const options = {
        beforeSubmit: this.showRequest,  // pre-submit callback
        success: this.showResponse , // post-submit callback,
        headers: {
          'auth': localStorage.getItem('token')
        }
      };
  
      // bind to the form's submit event
      $('#frmUploader').submit(function (e) {
          e.preventDefault();
          $(this).ajaxSubmit(options);
          // always return false to prevent standard browser submit and page navigation
          return false;
      });
    });
  }

  // pre-submit callback
  showRequest(formData, jqForm, options) {
    alert('Uploading is starting.');
    return true;
  }

  // post-submit callback
  showResponse(responseText, statusText, xhr, $form) {
      alert('status: ' + statusText + '\n\nresponseText: \n' + responseText );
  }

  render() {
    const { itinerary } = this.props;

    return (
      <div className="row card container-padding">
        <div className="row">
          <div className="col s4 left-align">
            <p>Flight Number: {itinerary.flightNo}</p>
          </div>
        </div>


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
          <div className="col s12 left-align">
            <form id="frmUploader" encType="multipart/form-data" action="/itinerary/upload" method="post">
              <input type="file" name="imgUploader" multiple />
              <input type="submit" name="submit" id="btnSubmit" value="Upload" />
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col s6 left-align">
            <Button
              onClick={() => this.props.delete_travel_itinerary({itineraryId: itinerary._id})}
              className="red"
              waves='light'>
              <TrashBin size={20} /> Remove
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