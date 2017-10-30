import React, { Component } from 'react';
import {
  update_traveler_status,
  get_shipping_details,
  get_itinerary_details
} from '../../actions';
import { connect } from 'react-redux';
import AddShipping from './addShipping';
import AddItinerary from './addTravelItinerary';
import { Collapsible, CollapsibleItem, Row } from 'react-materialize';
import ShippingAddress from './shippingAddress';
import TravelItinerary from './travelItinerary';
import { Button } from 'react-materialize';
import EditIcon from 'react-icons/lib/md/create';
import AddIcon from 'react-icons/lib/md/add';

class ProfileDetails extends Component {
  state = {
    loading: false,
    addingShipping: false,
    addingItinerary: false,
  }

  componentDidMount() {
    this.getShippingDetails();
    this.getItineraryDetails();
  }

  getShippingDetails() {
    const { user } = this.props;
    this.props.get_shipping_details({shippingIds: user.shippingAddressIds});
  }

  completeAddingShipping() {
    this.getShippingDetails();
    this.setState({ addingShipping: false });
  }

  getItineraryDetails() {
    const { user } = this.props;
    this.props.get_itinerary_details({itineraryIds: user.itineraryIds});
  }

  completeAddingItinerary() {
    this.getItineraryDetails()
    this.setState({ addingItinerary: false });
  }

  stopAddingShipping() {
    this.setState({ addingShipping: false });
  }
  
  stopAddingItinerary() {
    this.setState({ addingItinerary: false });
  }

  render() {
    const { user } = this.props;

    return (
    <div className="container container-padding">
      <div className="row">
        <div className="col s6 left-align">
          <h5>Welcome back, <b>{user.username}</b></h5>
        </div>
      </div>
      <br />
      <div className="card container-padding">
        <div className="row left-align">
          <div className="col s4">
            <h6>First Name: {user.firstname}</h6>
          </div>

          <div className="col s4">
            <h6>Last Name: {user.lastname}</h6>
          </div>

          <div className="col s4">
            <h6>Email: {user.email}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s6">
            <h6>Mailing Address 1: {user.mailingAddress1}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s6">
            <h6>Mailing Address 2: {user.mailingAddress2}</h6>
          </div>
        </div>
        <div className="row left-align">
          <div className="col s4">
            <h6>Mailing City: {user.mailingCity}</h6>
          </div>

          <div className="col s4">
            <h6>Mailing Country: {user.mailingCountry}</h6>
          </div>

          <div className="col s3">
            <h6>Mailing Zip: {user.mailingZip}</h6>
          </div>

          <div className="col s1 edit-profile-btn">
            <Button
              title="Edit Profile"
              floating
              className="blue"
              id="edit-profile"
              onClick={() => this.props.edit()}
              waves='light'><EditIcon size={25} /></Button>
          </div>
        </div>
      </div>

      { 
        user ?
      <Row>
        <h5>Are you traveling soon?</h5>
        <div className="switch">
          <label>No<input type="checkbox" checked={user.traveler} onChange={(e) => this.props.update_traveler_status({ status: e.target.checked})} />
            <span className="lever">
            </span>Yes
          </label>
        </div> 
      </Row>
      :
      ''
      }
      {
        user.traveler ?
      <Collapsible accordion={true} defaultActiveKey={0}>
      <CollapsibleItem header='Shipping Address'>
      {
        this.state.addingShipping ?
        <AddShipping
          done={this.completeAddingShipping.bind(this)}
          cancel={this.stopAddingShipping.bind(this)}
        />
        :
        <div>
          <div className="row">
            <div className="col s6 left-align">
              <h5>Shipping Address</h5>
            </div>
            <div className="col s6 right-align">
              <Button
                title="Add Shipping Address"
                floating
                className="green"
                onClick={() => this.setState({ addingShipping: true })}
                waves='light'
                id="add-itinerary">
                <AddIcon size={25} />
              </Button>
            </div>
          </div>
          <div className="row container-padding">
          {
            user.shippingAddressIds.length < 1 ?
            <div className="row">
              <h6>No Shipping Addresses</h6>
            </div>
            :
            <div>
              { 
                this.props.shippingAddresses ?
                this.props.shippingAddresses.map(address => {
                  return <ShippingAddress key={address._id} address={address} />
                })
                :
                ''
              }
            </div> 
          }
          </div>
      </div>
      }
      </CollapsibleItem>
      <CollapsibleItem header='Travel Itinerary'>
      {
        this.state.addingItinerary ?
        <AddItinerary
          done={this.completeAddingItinerary.bind(this)}
          cancel={this.stopAddingItinerary.bind(this)}
        />
        :
        <div>
          <div className="row">
            <div className="col s6 left-align">
              <h5>Travel Itinerary</h5>
            </div>
            <div className="col s6 right-align">
              <Button
                title="Add Travel Itinerary"
                floating
                className="green"
                onClick={() => this.setState({ addingItinerary: true })}
                waves='light'
                id="add-itinerary">
                <AddIcon size={25} />
              </Button>
            </div>
          </div>
          <div className="row container-padding">
          {
            user.itineraryIds.length < 1 ?
            <div className="row">
              <h6>No Travel Itinerary</h6>
            </div>
            :
            <div>
              { 
                this.props.travelItinerary ?
                this.props.travelItinerary.map(itinerary => {
                  return <TravelItinerary key={itinerary._id} itinerary={itinerary} />
                })
                :
                ''
              }
            </div> 
          }
          </div>
      </div>
      }
      </CollapsibleItem>
      </Collapsible>
      :
      ''
      }
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    shippingAddresses: state.shippingAddresses,
    travelItinerary: state.travelItinerary
  }
}

export default connect(
  mapStateToProps,
  {
    update_traveler_status,
    get_shipping_details,
    get_itinerary_details
  })(ProfileDetails);