import React, { Component } from 'react';
import { update_user } from '../../actions';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';

class EditProfile extends Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingCity: '',
    mailingCountry: '',
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    return nextProps === this.props ? '' 
    :
    this.finalize()
  }

  componentDidMount() {
    const {
      username,
      firstname,
      lastname,
      email,
      mailingAddress1,
      mailingAddress2,
      mailingCity,
      mailingCountry
    } = this.props.user;

    this.setState({
      username,
      firstname,
      lastname,
      email,
      mailingAddress1,
      mailingAddress2,
      mailingCity,
      mailingCountry
    });
  }

  renderInput(type, id, val, onchange) {
    return(
      <input
        type={type}
        id={id}
        value={val}
        onChange={onchange}
      />
    )
  }

  finalize() {
    this.setState({ loading: false });
    this.props.done();
  }

  updateProfile() {
    this.setState({ loading: true });
    const newUser = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      mailingAddress1: this.state.mailingAddress1,
      mailingAddress2: this.state.mailingAddress2,
      mailingCity: this.state.mailingCity,
      mailingCountry: this.state.mailingCountry
    };

    this.props.update_user(newUser);
  }

  render() {
    return(
      <div className="container container-padding">

        {
          this.state.loading ?
          (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )
          :
          <div></div>
        }

        <div>
          <div className="row">
            <h5>Edit Profile</h5>
          </div>
          <br />
          <div className="card container-padding">
            <div className="row">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "Username",
                    this.state.username,
                    (e) => this.setState({ username: e.target.value })
                  )
                }
                <label className="active" htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "firstname",
                    this.state.firstname,
                    (e) => this.setState({ firstname: e.target.value })
                  )
                }
                <label className="active" htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "lastname",
                    this.state.lastname,
                    (e) => this.setState({ lastname: e.target.value })
                  )
                }
                <label className="active" htmlFor="lastname">Last Name</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "email",
                    "email",
                    this.state.email,
                    (e) => this.setState({ email: e.target.value })
                  )
                }
                <label className="active" htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingAddress1",
                    this.state.mailingAddress1,
                    (e) => this.setState({ mailingAddress1: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingAddress1">Mailing Address 1</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingAddress2",
                    this.state.mailingAddress2,
                    (e) => this.setState({ mailingAddress2: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingAddress2">Mailing Address 2</label>
              </div>
            </div>
            <div className="row left-align">
              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingCity",
                    this.state.mailingCity,
                    (e) => this.setState({ mailingCity: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingCity">Mailing City</label>
              </div>

              <div className="input-field col s4">
                {
                  this.renderInput(
                    "text",
                    "mailingCountry",
                    this.state.mailingCountry,
                    (e) => this.setState({ mailingCountry: e.target.value })
                  )
                }
                <label className="active" htmlFor="mailingCountry">Mailing Country</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            <Button
              className="btn-spacing"
              onClick={this.updateProfile.bind(this)}
              waves='light'
              id="update-user">Update User</Button>

            <Button
              onClick={() => this.props.cancel()}
              waves="light"
              className="red">Cancel</Button>
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

export default connect(mapStateToProps, {update_user})(EditProfile);