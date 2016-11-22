import Events from 'events';
import RegistrationConstants from '../constants/RegistrationConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class RegistrationStore extends Events.EventEmitter {

  constructor(props) {
    super(props);
    this.error = null;
    this.registered = false;
    AppDispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.actionType) {
      case RegistrationConstants.REG_SUCCESS:
        this.registered = true;
        this.password = action.password;
        this.emit('change');
        break;
      case RegistrationConstants.REG_FAILED:
        this.error = action.message;
        this.emit('change');
        break;
    }
  }

}

export default new RegistrationStore();