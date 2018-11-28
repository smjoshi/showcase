import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './App';
import './index.css';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={history}>
      <App />
  </Router>,
  document.getElementById('root') as HTMLElement
  
);
registerServiceWorker();

export default history;