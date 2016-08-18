/* eslint-disable react/no-string-refs, react/prop-types, max-len, no-param-reassign, no-confusing-arrow, eqeqeq */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import TaskCreate from './TaskCreate';
import TaskList from './TaskList';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.create = this.create.bind(this);
    this.complete = this.complete.bind(this);
    this.nuke = this.nuke.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.unlisten = browserHistory.listen(location => {
      if (location.pathname.trim() === '/tasks') {
        this.refresh(location.query.page);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  refresh(page = 0) {
    axios.get(`http://localhost:9001/api/tasks?page=${page}`)
    .then((response) => {
      this.setState({ tasks: response.data.content });
    });
  }

  create(e) {
    e.preventDefault();

    const name = this.refs.creator.refs.name.value;
    const category = this.refs.creator.refs.category.value;
    const due = this.refs.creator.refs.due.value;

    axios.post('http://localhost:9001/api/tasks', { name, category, due })
    .then(() => browserHistory.push('/tasks?page=0'));
  }

  nuke(e) {
    const id = e.target.attributes['data-id'].value;
    axios.delete(`http://localhost:9001/api/tasks/${id}`)
    .then(() => browserHistory.push('/tasks?page=0'));
  }

  complete(e) {
    const id = e.target.attributes['data-id'].value;
    axios.patch(`http://localhost:9001/api/tasks/${id}/complete`)
    .then((response) => {
      const tasks = this.state.tasks.map(t => (t.id == id) ? response.data : t);
      this.setState({ tasks });
    });
  }

  render() {
    return (
      <div>
        <TaskCreate ref="creator" create={this.create} />
        <TaskList page={this.props.location.query.page} nuke={this.nuke} complete={this.complete} tasks={this.state.tasks} />
      </div>
    );
  }
}
