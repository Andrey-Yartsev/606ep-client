import AppDispatcher from '../dispatcher/AppDispatcher';
import RegistrationConstants from '../constants/RegistrationConstants';
import ApiRequest from '../utils/ApiRequest';

class RegistrationActions {

  register(login) {
    ApiRequest.request('register', 'POST', function(data) {
      if (data.error) {
        AppDispatcher.dispatch({
          actionType: RegistrationConstants.REG_FAILED,
          message: data.message
        });
      } else {
        AppDispatcher.dispatch({
          actionType: RegistrationConstants.REG_SUCCESS,
          password: data.password
        });
      }
    }, {
      login: login
    });
  }

}

export default new RegistrationActions();