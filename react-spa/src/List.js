import React, { Component } from 'react';
import ListItem from './ListItem';

export default class List extends Component {
  renderListItem = list => {
    if (!list || list.items.length === 0) {
      return 'No items... yet!';
    }
    return list.items.map(item => (
      <ListItem key={item._id} item={item} onDelete={() => this.props.onDeleteItem(item)} />
    ));
  };

  render() {
    const renderedItems = this.renderListItem(this.props.list);
    return (
      <div>
        {this.props.list ? (
          <h1 className="d-flex justify-content-between">
            <span>{this.props.list.name}</span>
            <button
              type="button"
              onClick={() => this.props.onDeleteList(this.props.list)}
              className="btn btn-danger"
            >
              Delete list
            </button>
          </h1>
        ) : null}
        <ul className="list-group">{renderedItems}</ul>
      </div>
    );
  }
}
