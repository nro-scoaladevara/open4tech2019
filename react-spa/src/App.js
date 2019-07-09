import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';
import HomePage from './HomePage';
import ListDetailPage from './ListDetailPage';

const history = createBrowserHistory();

function App() {
  return (
    <div className="app container">
      <Router history={history}>
        <nav className="navbar navbar-light bg-light">
          <h1 className="navbar-brand">Open 4 Tech SPA</h1>
          <div className="navbar-nav">
            <Link className="navbar-link" to="/">
              Back to home
            </Link>
          </div>
        </nav>
        <div className="mt-3">
          <Route path="/" exact component={HomePage} />
          <Route path="/lists/:listId" component={ListDetailPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
