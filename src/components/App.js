import React from 'react';
import TaskList from './TaskList';
import AddTaskButton from './AddTaskButton';
import LogoutButton from './LogoutButton';
import TaskStore from '../stores/TaskStore';
import Login from './Login';
import LoginStore from '../stores/LoginStore';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tasks: []}
  }

  load() {
    this.setState({
      authorized: LoginStore.authorized,
      tasks: TaskStore.getAll()
    });
  }

  componentDidMount() {
    this.load();
    TaskStore.on('change', this.onChange.bind(this));
    LoginStore.on('change', this.onChange.bind(this));
    LoginStore.on('change', function() {
      if (LoginStore.authorized) {
        TaskStore.load();
      }
    });
    if (LoginStore.authorized) {
      TaskStore.load();
    }
  }

  onChange() {
    this.load();
  }

  render() {
    if (this.state.authorized) {
      return (
        <div className="App">
          <h1>You are logged in <LogoutButton/></h1>
          <AddTaskButton/>
          <hr/>
          <TaskList tasks={this.state.tasks}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Login</h1>
          <Login/>
        </div>
      );
    }
  }

}

export default App;
