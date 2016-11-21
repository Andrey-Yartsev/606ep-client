import React from 'react';
import DeleteTaskButton from './DeleteTaskButton';

class TaskList extends React.Component {

  render() {
    let tasks = Object.keys(this.props.tasks).map((k) => this.props.tasks[k]);
    let list = [];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      list.push(<li key={task.id}>Task ID={task.id}<DeleteTaskButton id={task.id}/></li>);
    }
    return <ul>{list}</ul>;
  }

}

export default TaskList;