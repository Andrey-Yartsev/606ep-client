import React from 'react';
import TaskActions from '../actions/TaskActions';

export default class AddTaskButton extends React.Component {

  render() {
    return (
      <button onClick={this.onClick.bind(this)}>Create</button>
    );
  }

  onClick() {
    this.create();
  }

  create() {
    TaskActions.create();
  }

}
