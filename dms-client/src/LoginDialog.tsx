

import * as React from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import history from './index';

import axios, { AxiosResponse } from 'axios';

import ApiHandler from './ApiHandler';
import UserCtx from './UserContext';

import {AppcontextConsumer} from'./AppContextProvider';
import * as appConstant from './AppConstants';



class LoginDialog extends React.Component {

    
    constructor(props: any){
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUserContextWithOrgId = this.updateUserContextWithOrgId.bind(this);
        
    }

    apiHandler = new ApiHandler();

    public state = {
        open : false,
        email : "",
        password : "",  
        userCtx: new UserCtx(),

    };

    public handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    public  handleClose = () => {
        this.setState({ open: false });
    };

    public handleSubmit = () => {
        
        var user =  Object.create(null);
        user.email = this.state.email;
        user.password = this.state.password; 

       // apiResponse = this.apiHandler.postCall("http://localhost:8080/api/users/login", user);
       
       
       axios.post(appConstant.API_URL+"/users/login", 
                   JSON.stringify(user), 
                   { headers : {
                        'Content-Type' : 'application/json', 
                        'Access-Control-Allow-Origin' : '*',
                        withCredentials: true,
                        credentials: 'same-origin'
                        }

                    }
                  ).then(res => (
                          alert("Success"),
                          console.log(res),
                          this.setUserContext(res),
                          history.push("/home")
                        ))
                        .catch(function(error){
                            alert("Error while calling API");
                        });

    };

    private handleEmail(event: any){
        this.setState({
            email: event.target.value,
        });
    };

    private handlePassword(event: any){
        this.setState({
            password:  event.target.value,
        });
    };


    private updateUserContextWithOrgId(userCx: UserCtx) {
            alert("retrieving org information");
            axios.get(appConstant.API_URL+"/orgs/user/"+userCx.userId).then(res => {
                var orgId = res.data[0].orgId;

                alert("Org id set in context : " + orgId)
                userCx.orgId = orgId;
                this.setState({
                    userCtx: userCx,
                });
           
            })
            .catch((error) => {
                alert(error);
            } )
    }
    
    private setUserContext(res: AxiosResponse){

        var  usrCx = new  UserCtx();
        usrCx.name = res.data.firstName;
        usrCx.userId = res.data.userId;
        usrCx.loggedIn = true;

        this.setState({
            userCtx: usrCx,
        });
   
        
        //Get user Org detail
        this.updateUserContextWithOrgId(usrCx);
      
    };


    public  render() {
            
            return (
                <AppcontextConsumer>
                        {(userContext) => (userContext.updateUserInfo(this.state.userCtx),
                <div>
                    <Button onClick={this.handleClickOpen} color="inherit">Login</Button>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="login-dialog-title"
                    >
                    <DialogTitle id="login-dialog-title">Login</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Login with Email Id / User Id
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="name"
                        label="E-mail/User Id"
                        type="text"
                        fullWidth={true}
                        onChange={this.handleEmail} 
                    />
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth={true}
                        onChange={this.handlePassword} 
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Login
                    </Button>
                    </DialogActions>
                </Dialog>
            
                </div>
                        )}
                </AppcontextConsumer>
            
            )}
        
  }

  export default LoginDialog;