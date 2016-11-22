import React from 'react';
import RegistrationActions from '../actions/RegistrationActions';
import RegistrationStore from '../stores/RegistrationStore';

export default class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false
    }
  }

  onChange() {
    let state = {
      registered: false
    };
    if (RegistrationStore.error) {
      state.error = RegistrationStore.error;
    } else if (RegistrationStore.registered) {
      state.registered = true;
      state.password = RegistrationStore.password;
    }
    this.setState(state);
  }

  componentDidMount() {
    RegistrationStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    RegistrationStore.removeListener('change', this.onChange.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    RegistrationActions.register(this.login);
  }

  handleChange(event) {
    this.login = event.target.value;
  }

  render() {
    if (this.state.registered) {
      return (
        <div>Registration complete. Password: {this.state.password}</div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.error && <p>Error: {this.state.error}</p>}
        <p>
          Phone / Email:<br/>
          <input type="text" onChange={this.handleChange.bind(this)} />
        </p>
        <input type="submit" value="Register"/>
      </form>
    );
  }

}