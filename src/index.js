import React from 'react';
import { render } from 'react-dom';
// import Provider from 'react-redux'
// import { createStore } from 'redux'
import App from './containers/App';
import './index.css';
// import form from './reducers/index.js'

// let store = createStore(form)

render(
    <App />,
  document.getElementById('root')
);
