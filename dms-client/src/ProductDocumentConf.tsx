
import * as React from "react";
import { AppContext } from "./AppContextProvider";
import { withStyles,  WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ProductConfDialog from "./ProductConfDialog";
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
      width: '70%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });


interface Props extends WithStyles<typeof styles>{
    productId: number;
}

interface State {
    open: boolean;
    productConfList: []
}

class ProductDocumentConf extends React.Component<Props, State>{
    static contextType = AppContext;
    state: State;

    constructor(props){
        super(props);
        this.state = ({open: false, productConfList: []});
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClickOpen(){
        this.setState({open: true});
    }

    handleClose = value => {
        this.setState({open: value});
    }

    componentDidMount(){
        alert(" In Product detail.componentDidMount");
        
        var productId = this.props.productId;
        axios.get(appConstant.API_URL + "/configs/product/"+productId).then(res => {
            var productsConfs = res.data;
            alert("productConfList : " +  productsConfs );
            this.setState({
                productConfList : productsConfs,
            });
        })
        
    }
  

    public render(){
        const { classes } = this.props; 

        return(
            <div>
                    <div>
                        <Typography variant="title" gutterBottom align="left">
                            Product Document Configuration
                        </Typography>
                        <Button variant="fab" color="primary" aria-label="Edit" onClick={this.handleClickOpen}>
                                <AddIcon />
                        </Button>
                    </div>
                    <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <CustomTableCell>Id</CustomTableCell>
                            <CustomTableCell align="right">Description</CustomTableCell>
                            <CustomTableCell align="right">Document Type</CustomTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.productConfList.map(row => (
                            <TableRow className={classes.row} key={row['productId']}>
                            <CustomTableCell component="th" scope="row">
                                {row['productId']}
                            </CustomTableCell>
                            <CustomTableCell align="right">{row['description']}</CustomTableCell>
                            <CustomTableCell align="right">{row['docTypeCode']}</CustomTableCell>
                        
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
                <ProductConfDialog
                      open={this.state.open} 
                      onclose={this.handleClose}
                      productId={this.props.productId}
                />

            </div>
           
        );
    }
}


export default withStyles(styles) (ProductDocumentConf);
