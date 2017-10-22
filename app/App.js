import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import networkStore from './store/networkStore';
import NetworkTableConnected from './components/NetworkTable';

render((
  <Provider store={networkStore}>
    <Router history={createHistory()}>
      <Route path="/" component={NetworkTableConnected} />
    </Router>
  </Provider>
), document.getElementById('root'));
