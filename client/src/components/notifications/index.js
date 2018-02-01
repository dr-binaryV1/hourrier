import React, { Component } from 'react';
import { Container, Row, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { get_user, delete_all_notif } from '../../actions';

import { getNotifications } from '../../helpers/api';
import PackageNotification from './packageNotification';
import InvoiceNotification from './invoiceNotification';
import InfoIcon from 'react-icons/lib/md/info-outline';
import sortBy from 'sort-by';

class Notification extends Component {
  state = {
    notifications: null
  }

  componentDidMount() {
    document.querySelector('.nav-wrapper .active').classList.remove('active');;
    document.getElementById('notifications').classList.add('active');
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
      const notifications = res.notifications.sort(sortBy('-createdAt'));
      this.setState({ notifications });
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
          <div className="page-margin">
            <InfoIcon size={100} />
            <h5>No Notifications at this time</h5>
          </div>
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