import React, { Component } from 'react';
import { Container } from 'react-materialize';
import InfoIcon from 'react-icons/lib/md/info-outline';
import { connect } from 'react-redux';
import sortBy from 'sort-by';

import PackageItem from './packageItem';

class Package extends Component {
  render() {
    const { user } = this.props;
    let reverseIds = [];

    user ? reverseIds = user.packageIds.reverse() : '';

    return (
      <Container>
        {
          user ?
          user.packageIds.length > 0 ?
          reverseIds.map(id => {
            return <PackageItem key={id} id={id} />
          })
          :
          <div>
            <InfoIcon size={100} />
            <h5>No Package Accepted.</h5>
          </div>
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

export default connect(mapStateToProps)(Package);