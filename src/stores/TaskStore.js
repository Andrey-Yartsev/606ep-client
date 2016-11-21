import Events from 'events';
import TaskConstants from '../constants/TaskConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiRequest from '../utils/ApiRequest';

class TaskStore extends Events.EventEmitter {

  constructor(props) {
    super(props);
    this.tasks = {};
    AppDispatcher.register(this.handleAction.bind(this));
  }

  getAll() {
    return this.tasks;
  }

  load() {
    ApiRequest.request('tasks', 'GET', function(tasks) {
      var task;
      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        this.tasks[task.id] = {
          id: task.id
        }
      }
      this.emit('change');
    }.bind(this));
  }

  handleAction(action) {
    switch (action.actionType) {
      case TaskConstants.NEW_ITEM:
        this.create(action.title);
        this.emit('change');
        break;
      case TaskConstants.DELETE_ITEM:
        this.delete(action.id);
        this.emit('change');
        break;
      default:
        break;
    }
  }

  create(title) {
    ApiRequest.request('tasks', 'POST', function(data) {
      this.tasks[data.task.id] = {
        id: data.task.id
      };
      this.emit('change');
    }.bind(this));
  }

  delete(id) {
    ApiRequest.request('tasks/' + id, 'DELETE', function() {
      delete this.tasks[id];
      this.emit('change');
    }.bind(this));
  }

}

export default new TaskStore();