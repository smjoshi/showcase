import * as React from "react";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Theme, createStyles, WithStyles, Button, withStyles } from "@material-ui/core";
import * as appConstant from './AppConstants'


const styles = (theme: Theme) => createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

interface Props extends WithStyles<typeof styles>{
    open: boolean
    onclose: Function;
    productId: number
}

interface State {

    description: string
    docTypeCode: String
       
}

class ProductConfDialog extends React.Component<Props, State> {
    

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = ({description: '', docTypeCode: ''})
    }

 
    handleClose(){
        this.props.onclose(false);
    }

    handleSubmit(){
        //we don't want the form to submit, so we prevent the default behavior

       var productConf =  Object.create(null);
       productConf.description = this.state.description;
       productConf.docTypeCode = this.state.docTypeCode; 
       productConf.productId = this.props.productId;
 
      axios.post(appConstant.API_URL+"/configs/configuration", 
                  JSON.stringify(productConf), 
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
                         this.handleClose()
                       ))
                       .catch(function(error){
                           alert("Error while saving product configuration");
                       });
 
   }

   setValue (field, event) {
       //If the input fields were directly within this
       //this component, we could use this.refs.[FIELD].value
       //Instead, we want to save the data for when the form is submitted
       var object = {};
       object[field] = event.target.value;
       this.setState(object);
   }




    render(){
        const { classes, open, ...other} = this.props

        return(
            <Dialog  area-lebelledBy="Add / edit Products conf" {...other} open={this.props.open}>
                <DialogTitle id="add-edit-product">Add / Edit Product Configuration</DialogTitle>
                <DialogContent>
                    <div style={{width: 300}}>
                        <TextField 
                            id="product-conf-Description" 
                            label="Description" 
                            className={classes.textField}
                            defaultValue="Product Configuration description"
                            margin="normal"
                            onChange={this.setValue.bind(this, "description")}

                        />
                        <TextField 
                            id="product-doc-type-code" 
                            label="code" 
                            className={classes.textField}
                            defaultValue="Product doc type"
                            margin="normal"
                            onChange={this.setValue.bind(this, "docTypeCode")}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Save
                    </Button>
          </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles) (ProductConfDialog)