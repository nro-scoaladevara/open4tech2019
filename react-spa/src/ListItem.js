import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className="list-group-item d-flex justify-content-between">
        <span>{item.description}</span>
        <div className="item-actions">
          <button
            type="button"
            onClick={() => this.props.onDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
