import React, { Component } from 'react';
import axios from 'axios';
import constants from './constants';
import { withRouter } from 'react-router';
import AddItemForm from './AddItemForm';
import List from './List';

class ListDetailPage extends Component {
  state = { list: null, listApiError: null, itemApiError: null };

  componentWillMount() {
    const listId = this.props.match.params.listId;
    this.getListDetail(listId);
  }

  handleItemApiError = error => {
    if (error.response) {
      this.setState({ itemApiError: error.response.data.message });
    } else if (error.request) {
      this.setState({ itemApiError: error.request });
    } else {
      this.setState({ itemApiError: error.message });
    }
  }

  getListDetail = listId => {
    this.setState({ listApiError: null });
    return axios
      .get(`${constants.API_URL}/lists/${listId}`)
      .then(response => {
        this.setState({ list: response.data });
      })
      .catch(this.handleListApiError);
  };

  handleListApiError = error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.setState({ listApiError: error.response.data.message });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this.setState({ listApiError: error.request });
    } else {
      // Something happened in setting up the request that triggered an Error
      this.setState({ listApiError: error.message });
    }
  }

  handleAddItem = item => {
    this.setState({ itemApiError: null });
    const listId = this.props.match.params.listId;
    axios
      .post(`${constants.API_URL}/lists/${listId}/items`, item)
      .then(() => this.getListDetail(listId))
      .catch(this.handleItemApiError);
  };

  handleDeleteItem = item => {
    this.setState({ itemApiError: null });
    const listId = this.props.match.params.listId;
    axios
      .delete(`${constants.API_URL}/items/${item._id}`)
      .then(() => this.getListDetail(listId))
      .catch(this.handleItemApiError);
  }

  handleDeleteList = list => {
    this.setState({ listApiError: null });
    const listId = this.props.match.params.listId;
    axios
      .delete(`${constants.API_URL}/lists/${listId}`)
      .then(() => this.props.history.push('/'))
      .catch(this.handleListApiError);
  }

  render() {
    const { listApiError, itemApiError, list } = this.state;
    return (
      <div>
        {listApiError ? <h2>{listApiError}</h2> : <List list={list} onDeleteList={this.handleDeleteList} onDeleteItem={this.handleDeleteItem} />}

        <h5 className="mt-3">Add item</h5>
        <AddItemForm onAdd={this.handleAddItem} />
        {itemApiError && <div className="alert alert-danger">{itemApiError}</div>}
      </div>
    );
  }
}

export default withRouter(ListDetailPage);
