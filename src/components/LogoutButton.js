import React from 'react';
import LoginActions from '../actions/LoginActions';

export default class LogoutButton extends React.Component {

  render() {
    return (
      <button onClick={this.onClick.bind(this)}>Logout</button>
    );
  }

  onClick() {
    this.logout();
  }

  logout() {
    LoginActions.logout();
  }

}
