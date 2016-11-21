import Events from 'events';
import LoginConstants from '../constants/LoginConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class LoginStore extends Events.EventEmitter {

  constructor(props) {
    super(props);
    this.error = null;
    this.token = null;
    this.authorized = false;
    AppDispatcher.register(this.handleAction.bind(this));
    let token = localStorage.getItem('token');
    if (token) {
      this.authorize(token);
    }
  }

  authorize(token) {
    this.authorized = true;
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  logout() {
    this.authorized = false;
    this.token = null;
    localStorage.removeItem('token');
  }

  handleAction(action) {
    switch (action.actionType) {
      case LoginConstants.LOGGED_IN:
        this.authorize(action.token);
        this.emit('change');
        break;
      case LoginConstants.LOGIN_FAILED:
        this.error = 'Login failed';
        this.emit('changeLogin');
        break;
      case LoginConstants.LOGOUT:
        this.logout();
        this.emit('change');
        break;
      default:
        break;
    }
  }

}

export default new LoginStore();