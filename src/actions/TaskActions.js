import AppDispatcher from '../dispatcher/AppDispatcher';
import TaskConstants from '../constants/TaskConstants';

class TaskActions {

  create() {
    AppDispatcher.dispatch({
      actionType: TaskConstants.NEW_ITEM
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.DELETE_ITEM,
      id: id
    });
  }

}

export default new TaskActions();