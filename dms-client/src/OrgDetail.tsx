
import * as React from 'react';
import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';
import { AppContext } from './AppContextProvider';
import {Route, Switch} from 'react-router-dom'
import HomePage from './HomePage';
import { Typography } from '@material-ui/core';


<Switch>
  <Route  exact path='/home' component={HomePage}/>
</Switch>

const styles = (theme: Theme ) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
     
});

class OrgDetail extends React.Component<WithStyles<typeof styles>, {}> {
    static contextType = AppContext;
   
    state = {
        name: "",
        orgs: "",
        orgId: "",
        isAdd: false,
        isEdit: false,
    }


    componentDidMount(){
        alert(" In OrgDetail.componentDidMount");
        OrgDetail.contextType = AppContext;
        alert(this.context);
        this.setState({
            name: this.context.userInfo.userId,
        });
        
        var userId = this.context.userInfo.userId;
        axios.get("http://localhost:5000/api/orgs/user/"+userId).then(res => {
            var orgId = res.data[0].orgId;
            alert("orgId : " +  orgId );
            this.setState({
                orgId: orgId,
                orgs: res.data[0].orgName,
            });
        })
        
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value, 
        });
    }

    handleOrgChange = (event) => {
        this.setState({
            orgs: event.target.value, 
        });
    }

    handleOrgAdd = () => {
        //TODO : validate Inputs

        var org =  Object.create(null);
        org.orgName = this.state.orgs;

        org.userId = this.context.userInfo.userId; 
        alert("User Id : " + org.userId);

       // apiResponse = this.apiHandler.postCall("http://localhost:8080/api/users/login", user);
       
       
       axios.post("http://localhost:5000/api/orgs/org", 
                   JSON.stringify(org), 
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
                          alert(res)
                         
                        ))
                        .catch(function(error){
                            alert("Error while calling API");
                        });

    }

    private addOrg = () =>{
          this.setState({isAdd: true});
    }

    private editOrg = () => {
        this.setState({isEdit: true});
    }

    public render() {
     // const { classes } = this.props;
      let actionIcon;

      if (this.state.orgs.length > 0){
        actionIcon = <Button variant="fab" color="primary" aria-label="Edit" onClick={this.editOrg}>
                        <AddIcon />
                    </Button>;
      }else{
        actionIcon = <Button variant="fab" color="primary" aria-label="Edit" onClick={this.addOrg}>
                        <AddIcon />
                    </Button>;
      }

      return (
            <div className="OrgDetail">
               <Typography variant="title" gutterBottom align="left">
                    Org Details
                </Typography>
                {actionIcon}

               {this.state.isAdd && (<div className="OrgForm" >
                    <form className="OrgDetailForm" noValidate autoComplete="off">
                        <TextField
                            autoFocus={true}
                            id="orgName"
                            label="ORG Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            margin="normal"
                            type="text"
                            //className={classes.textField}

                        />
                        <TextField
                             autoFocus={true}
                            id="ownerName"
                            label="Owner Name"
                            value={this.state.orgs}
                            onChange={this.handleOrgChange}
                            margin="normal"
                            type="text"
                             //className={classes.textField}
                        />

                        <Button onClick={this.handleOrgAdd} color="primary">
                            Add
                        </Button>

                    </form>
                </div>)}

                {this.state.isEdit && (<div className="OrgForm" >
                    <form className="OrgDetailForm" noValidate autoComplete="off">
                        <TextField
                            autoFocus={true}
                            id="orgName"
                            label="ORG Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            margin="normal"
                            type="text"
                            //className={classes.textField}

                        />
                        <TextField
                             autoFocus={true}
                            id="ownerName"
                            label="Owner Name"
                            value={this.state.orgs}
                            onChange={this.handleOrgChange}
                            margin="normal"
                            type="text"
                             //className={classes.textField}
                        />

                        <Button onClick={this.handleOrgAdd} color="primary">
                            Edit
                        </Button>

                    </form>
                </div>)}
                
            </div>
            
      );
    }
  }

//   export default props => (<AppContext.Consumer>
//       {(context) => {return <OrgDetail {...props} userCtx={context.userInfo} />}}
//   </AppContext.Consumer>)
 
  export default withStyles(styles)(OrgDetail);