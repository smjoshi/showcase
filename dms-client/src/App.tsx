import * as React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import Header from './Header';
import Main from './Main';


<Switch>
  <Route  exact path='/home' component={HomePage}/>
</Switch>

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
      </div>
    );
  }
}



export default App;
