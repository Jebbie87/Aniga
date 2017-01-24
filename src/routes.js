import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App.js';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={App}/>
  </Route>
);

export default routes;