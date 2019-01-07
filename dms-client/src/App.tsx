import * as React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import Header from './Header';
import Main from './Main';
import AppContextProvider from './AppContextProvider';
import UserCtx from './UserContext'

<Switch>
  <Route  exact path='/home' component={HomePage}/>
</Switch>



class App extends React.Component {
  public render() {
    let ctx = new UserCtx();
    ctx.loggedIn = false,
    ctx.name = "guest";
    
    return (
      <div className="App">
        <AppContextProvider> 
          <Header/>
          <Main/>    
        </AppContextProvider>
       
      </div>
    );
  }
}



export default App;
