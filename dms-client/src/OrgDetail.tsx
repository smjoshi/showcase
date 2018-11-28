
import * as React from 'react';
import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';



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

    state = {
        name: "",
        orgs: [],
        isAdd: false,
        isEdit: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value, 
        });
    }

    private addOrg = () =>{
          this.setState({isAdd: true});
    }

    private editOrg = () => {
        this.setState({isEdit: true});
    }

    public render() {
      const { classes } = this.props;
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
               
                {actionIcon}

               {this.state.isAdd && (<div className="OrgForm" >
                    <form className="OrgDetailForm" noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            className={classes.textField}
                            label="ORG Name"
                            value={this.state.name}
                            margin="normal"
                        />
                        <TextField
                            id="OWNER-name"
                            className={classes.textField}
                            label="Owner Name"
                            value={this.state.name}
                            margin="normal"
                        />

                    </form>
                </div>)}
                
            </div>
           
      );
    }
  }


 
  export default withStyles(styles)(OrgDetail);