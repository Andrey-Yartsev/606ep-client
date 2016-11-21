import React from 'react';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange() {
    var state = {};
    if (LoginStore.error) {
      state.error = LoginStore.error;
    }
    this.setState(state);
  }

  componentDidMount() {
    LoginStore.on('changeLogin', this.onChange.bind(this));
  }

  componentWillUnmount() {
    LoginStore.removeListener('changeLogin', this.onChange.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    LoginActions.login(this.login, this.password);
  }

  handleLoginChange(event) {
    this.login = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.error && <p>Error: {this.state.error}</p>}
        {this.props.title && <h2>{this.props.title}</h2>}
        <p>
          Login:<br/>
          <input type="text" onChange={this.handleLoginChange.bind(this)} />
        </p>
        <p>
          Password:<br/>
          <input type="password" onChange={this.handlePasswordChange.bind(this)} />
        </p>
        <input type="submit" value="Login"/>
      </form>
    );
  }

}