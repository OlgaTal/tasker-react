/* eslint-disable react/no-string-refs, react/prop-types, max-len */

import React from 'react';

export default class TaskCreate extends React.Component {
  render() {
    return (
      <div>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>

              <div className="form-group">
                <label htmlFor="due">Due</label>
                <input ref="due" type="date" className="form-control" id="due" />
              </div>

              <button onClick={this.props.create} type="submit" className="btn btn-success">Create</button>
            </form>
          </div>
          <div className="col-xs-9" />
        </div>

      </div>
    );
  }
}
