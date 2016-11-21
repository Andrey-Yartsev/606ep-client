import React from 'react';
import TaskActions from '../actions/TaskActions';

export default class DeleteTaskButton extends React.Component {

  render() {
    return (
      <button onClick={this.onClick.bind(this)}>Delete</button>
    );
  }

  onClick() {
    this.delete();
  }

  delete() {
    TaskActions.delete(this.props.id);
  }

}
