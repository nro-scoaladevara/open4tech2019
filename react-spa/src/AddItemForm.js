import React, { Component } from 'react';

export default class AddItemForm extends Component {
  state = { newItemDescription: '' };

  handleNewItemDescriptionChange = event => {
    this.setState({ newItemDescription: event.target.value });
  };

  handleAdd = event => {
    event.preventDefault();
    this.setState({ newItemDescription: '' });
    this.props.onAdd({ description: this.state.newItemDescription });
  };

  render() {
    return (
      <form onSubmit={this.handleAdd}>
        <div className="form-group">
          <label htmlFor="item-description">Description</label>
          <input
            className="form-control"
            name="item-description"
            type="text"
            value={this.state.newItemDescription}
            onChange={this.handleNewItemDescriptionChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    );
  }
}
