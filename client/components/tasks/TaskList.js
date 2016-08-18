/* eslint-disable react/no-string-refs, react/prop-types, max-len, jsx-a11y/href-no-hash */

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default function (props) {
  const page = (props.page * 1) || 0;
  const prev = page <= 0 ? 0 : page - 1;
  const next = page + 1;

  return (
    <div>

      <nav>
        <ul className="pager">
          <li className="previous">
            <Link to={{ pathname: '/tasks', query: { page: prev } }}><span>&larr;</span> previous</Link>
          </li>
          <li className="next">
            <Link to={{ pathname: '/tasks', query: { page: next } }}>next <span>&rarr;</span></Link>
          </li>
        </ul>
      </nav>

      <table className="table">
        <thead>
          <tr>
            <th />
            <th />
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Due</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map(t => (
            <tr key={t.id}>
              <td><i data-id={t.id} onClick={props.nuke} className="fa fa-fire" /></td>
              <td>
                <i data-id={t.id} onClick={props.complete} className={t.isComplete ? 'fa fa-check' : 'fa fa-circle-o'} />
              </td>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.category}</td>
              <td>{moment(t.due).format('YYYY-MM-DD')}</td>
              <td>{moment(t.createdAt).format('YYYY-MM-DD')}</td>
              <td>{moment(t.updatedAt).format('YYYY-MM-DD')}</td>
            </tr>
            )
          )}
        </tbody>
      </table>

    </div>
  );
}
