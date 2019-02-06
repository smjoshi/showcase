import * as React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon'

//import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginDialog from './LoginDialog';
import RegisterDialog from './registerDialog';
import logo from './logo.svg';

import {AppcontextConsumer} from'./AppContextProvider';
import history from './index';



class Header extends React.Component{
   
    private handleGoToHomePage(){
        alert("go to Home page");
        history.push("/home");
    }

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
                <Grid alignItems="flex-end" direction="column" xs={2} item>
                    <AppcontextConsumer>
                        {(usrCtx) => (<div>Welcome {usrCtx.userInfo.name}</div>)}
                    </AppcontextConsumer>
                </Grid>
                <Grid>
                <SvgIcon {...this.props} onClick={this.handleGoToHomePage}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
                </Grid>

              </Grid>
            </header>
          </div>
        );
      }

}
export default Header;
