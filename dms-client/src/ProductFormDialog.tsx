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
    onclose: Function
    orgId : number
}

interface State {

    productName: string;
    description: string;
    productCode: string;
    orgId: number;
       
}

class ProductFormDialog extends React.Component<Props, State> {
    state: State;

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = ({productName: '', description: '', productCode: '', orgId: -1})
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose(){
        this.props.onclose(false);
    }

    handleSubmit(){
         //we don't want the form to submit, so we prevent the default behavior
 
        var product =  Object.create(null);
        product.productName = this.state.productName;
        product.description = this.state.description; 
        product.orgId = this.props.orgId;
  
       axios.post(appConstant.API_URL+"/products/product", 
                   JSON.stringify(product), 
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
                            alert("Error while saving product");
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
            <Dialog  area-lebelledBy="Add / edit Products" {...other} open={this.props.open}>
                <DialogTitle id="add-edit-product">Add / Edit Product Info</DialogTitle>
                <DialogContent>
                    <div style={{width: 250}}>
                        <TextField 
                            id="product-name" 
                            label="Name" 
                            className={classes.textField}
                            defaultValue="Product Name"
                            margin="normal"
                            onChange={this.setValue.bind(this, "productName")} 
                        />
                        <TextField 
                            id="product-Description" 
                            label="Description" 
                            className={classes.textField}
                            defaultValue="Product Description"
                            margin="normal"
                            onChange={this.setValue.bind(this, "description")} 

                        />
                        <TextField 
                            id="product-code" 
                            label="code" 
                            className={classes.textField}
                            defaultValue="Product code"
                            margin="normal"
                            onChange={this.setValue.bind(this, "productCode")} 
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

export default withStyles(styles) (ProductFormDialog)