import * as React from "react";
import { AppContext } from "./AppContextProvider";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ProductDocumentConf from "./ProductDocumentConf";
import {ArrowDownCircle, ArrowUpCircle} from 'mdi-material-ui'


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
  
  const styles = (theme : Theme) => createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      
    },
    table: {
      minWidth: 700,
      alignSelf: 'center'
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });


interface Props extends WithStyles<typeof styles>{
    product : object
}

interface State {
      selectedRow : number;
      selectedRowStatus : string;
}

class ProductDetailRow extends React.Component<Props, State> {
    static contextType = AppContext;
    state: State;

    
    constructor(props){
      super(props);
      this.state = ({selectedRow: 0, selectedRowStatus : 'closed'});
      this.handleRowClick = this.handleRowClick.bind(this);
      this.getDisplayStatus = this.getDisplayStatus.bind(this);
  }

  
    handleRowClick(rowId){
      if (rowId === this.state.selectedRow){
          if (this.state.selectedRowStatus === 'closed'){
            this.setState({selectedRowStatus: 'open'})
          }else{
            this.setState({selectedRowStatus: 'closed'})
          }
      }else{
        this.setState({selectedRow : rowId, selectedRowStatus: 'open'});
      }
    }

    private  getDisplayStatus(rowId) : string {
      
      let displayStatus =  'none';
       if (rowId === this.state.selectedRow && this.state.selectedRowStatus === 'open'){
          displayStatus = '';
       }else{
          displayStatus = 'none'
       }
      return displayStatus;
     
    };
    
    public render(){
      const {classes} = this.props;
      const { product } = this.props;
      var prod = JSON.parse(JSON.stringify(product)); 

      let arrow = this.getDisplayStatus(prod.productId) == 'none' ? <ArrowDownCircle /> : <ArrowUpCircle />

        return (
                  <React.Fragment>
                      <TableRow className={classes.row} key={prod.productId} onClick={ () => {this.handleRowClick(prod.productId)}}>
                        <CustomTableCell component="th" >
                            {prod.productId}
                          </CustomTableCell>
                          <CustomTableCell align="right">{prod.productName}</CustomTableCell>
                          <CustomTableCell align="right">{prod.description}</CustomTableCell>
                          <CustomTableCell >
                              {arrow}
                          </CustomTableCell>
                      </TableRow>
                      <div style={{display: this.getDisplayStatus(prod.productId)}}>
                         <ProductDocumentConf productId={prod.productId}/>
                      </div>
                  </React.Fragment>
        )
    }
}

export default withStyles(styles) (ProductDetailRow)