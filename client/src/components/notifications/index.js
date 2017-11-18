import React, { Component } from 'react';
import { Container, Row, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { get_user, delete_all_notif } from '../../actions';

import { getNotifications } from '../../helpers/api';
import PackageNotification from './packageNotification';
import InvoiceNotification from './invoiceNotification';

class Notification extends Component {
  state = {
    notifications: null
  }

  componentDidMount() {
     this.props.get_user();
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    return user ?
    nextProps === this.props ? '' 
    :
    this.getNotifs(user.notificationIds)
    : ''
  }

  getNotifs(notificationIds) {
    getNotifications(notificationIds)
    .then(res => res.json())
    .then(res => {
      this.setState({ notifications: res.notifications });
    })
    .catch(err => `Error reported: ${err}`)
  }

  render() {
    const { user } = this.props;
    const { notifications } = this.state;

    user ?
    this.state.notifications === null ?
    this.getNotifs(user.notificationIds)
    : '' 
    : '';

    return (
      <Container>
        {
          notifications ?
          notifications.length > 0 ?
          <Row className="right-align">
            <Button
              onClick={() => this.props.delete_all_notif()}
              className="search-btn"
              waves="light">
              Dismiss All
            </Button>
          </Row>
          : ''
          : ''
        }
        {
          user ?
          user.notificationIds.length < 1 ?
          <h5>No Notifications at this time</h5>
          :
          notifications ?
          <div>
            <p className="left-align important-msg"><i>*You have some stuff that needs attention.</i></p>
            {
              notifications.map(notification => {
                return notification.type !== 'invoice' ? 
                <PackageNotification notification={notification} key={notification._id} />
                :
                <InvoiceNotification notification={notification} key={notification._id} />
              })
            }
          </div>
          :
          ''
          :
          ''
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { get_user, delete_all_notif })(Notification);