import React, { Component } from 'react';
import {
  update_traveler_status,
  get_shipping_details,
  get_itinerary_details
} from '../../actions';
import { connect } from 'react-redux';
import AddShipping from './addShipping';
import AddItinerary from './addTravelItinerary';
import { Collapsible, CollapsibleItem, Row, Pagination, PaginationButton } from 'react-materialize';
import ShippingAddress from './shippingAddress';
import TravelItinerary from './travelItinerary';
import { Button } from 'react-materialize';
import EditIcon from 'react-icons/lib/md/create';
import AddIcon from 'react-icons/lib/md/add';
import InfoIcon from 'react-icons/lib/md/info-outline';
import { getOrdersByBuyerId } from '../../helpers/api';
import Order from './order';
import Profile from 'react-icons/lib/md/account-circle';
import Home from 'react-icons/lib/md/home';
import Email from 'react-icons/lib/md/email';

class ProfileDetails extends Component {
  state = {
    loading: false,
    addingShipping: false,
    addingItinerary: false,
    orders: []
  }

  componentDidMount() {
    this.getShippingDetails();
    this.getItineraryDetails();
    this.getOrders();
  }

  getShippingDetails() {
    const { user } = this.props;
    this.props.get_shipping_details({shippingIds: user.shippingAddressIds});
  }

  getOrders() {
    const { user } = this.props;
    getOrdersByBuyerId(user._id)
    .then(res => res.json())
    .then(res => this.setState({ orders: res.reverse() }))
    .catch(err => console.log(`Error reported: ${err}`))
  }

  completeAddingShipping() {
    this.getShippingDetails();
    this.setState({ addingShipping: false });
  }

  stopAddingShipping() {
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

  stopAddingItinerary() {
    this.setState({ addingItinerary: false });
  }

  render() {
    const { user } = this.props;

    return (
    <div className="col s12 profile">
      <div className="col s12 profile-header">
        <div className="row left-align">
          <h5 className="col s11">Welcome back, <b>{user.username}</b></h5>
        </div>
      </div>

      <Row className="container profile-card card account-card">
        <div className="col s12 profile-card-header">
          <h5 className="col s12">Account</h5>
          <div className="col s1 edit-profile-btn">
            <Button
              title="Edit Profile"
              floating
              id="edit-profile"
              onClick={() => this.props.edit()}
              waves='light'><EditIcon size={20} className="editIcon" /></Button>
          </div>
        </div>
        <div className="profile-data-text">
          <div className="col s4">
            <Profile size={50} />
          </div>
          <div className="col s4">
            <Email size={50} />
          </div>
          <div className="col s4">
            <Home size={50} />
          </div>
          <div className="col s4">
            <p>{user.firstname} {user.lastname}</p>
          </div>
          <div className="col s4">
            <p>{user.email}</p>
          </div>
          <div className="col s4">
            <p>{user.mailingAddress1}, {user.mailingAddress2}</p>
            <p>{user.mailingCity}</p>
            <p>{user.mailingCountry}</p>
          </div>
        </div>
      </Row>
      <br />
      <Row className="container container-padding profile-card">
        <Collapsible>
          <div className="col s12 profile-card-header">
            <h5>Orders</h5>
          </div>
          <CollapsibleItem
            header='Click to expand / collapse orders'>
            {
              this.state.orders.length > 0 ?
              this.state.orders.map(order => {
                return <Order key={order._id} order={order} />
              })
              :
              <Row>
                <InfoIcon size={50} />
                <h6>No Orders yet</h6>
              </Row>
            }
          </CollapsibleItem>
        </Collapsible>
      </Row>

      {
        user ?
      <Row>
        <h5>Are you traveling soon?</h5>
        <div className="switch" title="Traveler Mode">
          <label>No
            <input
              type="checkbox"
              checked={user.traveler}
              onChange={(e) => {
                this.props.update_traveler_status({ status: e.target.checked});
              }}
            />
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
              {
                user.itineraryIds.length < 1 ?
                <Button
                  title="Add Travel Itinerary"
                  floating
                  className="green"
                  onClick={() => this.setState({ addingItinerary: true })}
                  waves='light'
                  id="add-itinerary">
                  <AddIcon size={25} />
                </Button>
                :
                ''
              }
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
