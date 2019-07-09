import React, { Component } from 'react';
import axios from 'axios';
import constants from './constants';
import { withRouter } from 'react-router';

class HomePage extends Component {
  state = {
    listName: '',
    createListError: null
  };

  handleAddList = event => {
    event.preventDefault();
    const url = `${constants.API_URL}/lists`;
    axios
      .post(url, { name: this.state.listName })
      .then(response => {
        this.props.history.push(`/lists/${response.data.id}`);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.setState({ createListError: error.response.data.message });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.setState({ createListError: error.request });
        } else {
          // Something happened in setting up the request that triggered an Error
          this.setState({ createListError: error.message });
        }
      });
  };

  handleListNameChange = event => {
    this.setState({ listName: event.target.value });
  };

  render() {
    const { createListError } = this.state;
    return (
      <div>
        <h5>Create a new list</h5>
        <form onSubmit={this.handleAddList}>
          <div className="form-group">
            <label htmlFor="list-name">New list name</label>
            <input
              className="form-control"
              name="list-name"
              type="text"
              value={this.state.listName}
              onChange={this.handleListNameChange}
            />
          </div>
          {createListError && <div className="alert alert-danger">{createListError}</div>}
          <button className="btn btn-primary" type="submit">
            Go
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(HomePage);
