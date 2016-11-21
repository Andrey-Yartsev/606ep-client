import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';
import ApiRequest from '../utils/ApiRequest';

class LoginActions {

  login(login, password) {
    ApiRequest.request('login', 'POST', function(data) {
      if (data.status === 'error') {
        AppDispatcher.dispatch({
          actionType: LoginConstants.LOGIN_FAILED
        });
      } else {
        AppDispatcher.dispatch({
          actionType: LoginConstants.LOGGED_IN,
          token: data.token
        });
      }
    }, {
      login: login,
      password: password
    });
  }

  logout() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT
    });
  }

}

export default new LoginActions();