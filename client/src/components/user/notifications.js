import React, { Component } from 'react';
import { Container, Row, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { get_user } from '../../actions';

import { getNotifications } from '../../helpers/api';
import NotificationItem from './notificationItem';

class Notification extends Component {
  state = {
    notifications: null
  }

  componentDidMount() {
     this.props.get_user();
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
        <Row className="right-align">
          <Button
            className="search-btn"
            waves="light">
            Dismiss All
          </Button>
        </Row>
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
                return <NotificationItem notification={notification} key={notification._id} />
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

export default connect(mapStateToProps, { get_user })(Notification);