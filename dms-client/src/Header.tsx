import * as React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';

//import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginDialog from './LoginDialog';
import RegisterDialog from './registerDialog';
import logo from './logo.svg';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();


class Header extends React.Component{

    public render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Showcase</h1>
              <Grid container={true}  xs={8} >
                <Grid alignItems="flex-end" direction="column" xs={1} item>
                    <LoginDialog />
                </Grid>
                <Grid alignItems="flex-end" direction="column" xs={1} item>
                    <RegisterDialog />
                </Grid>
              </Grid>
            </header>
          </div>
        );
      }

}
export default Header;
