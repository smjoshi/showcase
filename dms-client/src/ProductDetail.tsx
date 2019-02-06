import * as React from "react";

import Typography from '@material-ui/core/Typography'
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductDetailRow from "./ProductDetailRow";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ProductFormDialog from "./ProductFormDialog";
import { AppContext } from "./AppContextProvider";
import axios from 'axios';
import * as appConstant from './AppConstants';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = (theme: Theme) => createStyles({
    root: {
      width: '90%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
      margin: "auto"
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
  


interface Props extends WithStyles<typeof styles>{

}

interface State {
   open: boolean;
   productList: [];
}


class ProductDetail extends React.Component<Props, State> {
    static contextType = AppContext;
    state: State;

    constructor(props){
      super(props)
      this.state = ({open: false,  productList: []});
      this.handleClickOpen = this.handleClickOpen.bind(this);
      //this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
      alert(" In Product detail.componentDidMount");
      ProductDetail.contextType = AppContext;
      alert(this.context);
      
      var orgid = this.context.userInfo.orgId;
      axios.get(appConstant.API_URL + "/products/org/"+orgid).then(res => {
          var products = res.data;
          alert("productList : " +  products );
          this.setState({
            productList : products,
          });
      })
      
  }


    handleClickOpen(){
        this.setState({open: true});
    }

    handleClose = value => {
      this.setState({open: value});
    }

    
    
    public render(){
      const {classes} = this.props;
        return (
            <div className="ProductDetail">
                 <Typography variant="title" gutterBottom align="left">
                    Product Details
                 </Typography>
                 <Button variant="fab" color="primary" aria-label="Edit" onClick={this.handleClickOpen}>
                        <AddIcon />
                  </Button>
                 <div>
                   <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                              <CustomTableCell>ID</CustomTableCell>
                              <CustomTableCell>Product Name</CustomTableCell>
                              <CustomTableCell>Product Description</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                              this.state.productList.map(row => (
                                  <ProductDetailRow product={row}/>
                              ))
                            }
                        </TableBody>
                      </Table>
                   </Paper>
                   <ProductFormDialog 
                      open={this.state.open} 
                      onclose={this.handleClose}
                      orgId={this.context.userInfo.orgId}
                    />
                 </div>

            </div>
        )

    }

}

export default withStyles(styles) (ProductDetail)