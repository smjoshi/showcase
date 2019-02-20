import * as React from "react";
import { AppContext } from "./AppContextProvider";
import Typography from '@material-ui/core/Typography'
import { TextField, Theme, WithStyles, createStyles, withStyles, Button } from "@material-ui/core";
import axios from 'axios';
import * as appConstant from './AppConstants';
import SimpleTileView from "./SimpleTileView";


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

interface Props extends  WithStyles<typeof styles> {

}

interface State {
    productId: number
    productDocConf: []
    docDetails: []
    productDocs: any[]
}

class DocumemntDetail extends React.Component<Props, State> {
    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = ({productId: 0, productDocConf: [], docDetails: [], productDocs:[]})
        this.setValue = this.setValue.bind(this);
        this.retriveProductDocumentData = this.retriveProductDocumentData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    setValue (field, event) {
        //If the input fields were directly within this
        //this component, we could use this.refs.[FIELD].value
        //Instead, we want to save the data for when the form is submitted
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(){
        alert("product Id submitted ");

        //get Product doc configuration
        this.retriveProductDocumentData(this.state.productId);
    }


    private retriveProductDocumentData = (productId: number) => {
        
        //get Product configuration
         axios.get(appConstant.API_URL + "/configs/product/"+productId).then(res => {
            {this.setState({productDocConf: res.data})}
        })

        axios.get(appConstant.API_URL + "/configs/product/"+productId).then(res => {
            {this.setState({docDetails: res.data})}
        })

        if (this.state.productDocConf.length > 0 && this.state.docDetails.length > 0){

            var productDocuments: any[] = [];
            this.state.productDocConf.forEach(docConf => {

                var document =  Object.create(null);
                document.productId = docConf['productId']
                document.docConfId = docConf['docConfId']
                document.description = docConf['description']
                document.docTypeCode = docConf['docTypeCode']
                document.url = "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"

                this.state.docDetails.forEach(detail => {
                    if (docConf['docConfId'] == detail['productDocConfId']){
                        document.url = detail['docUrl'];
                    }
                } )

                productDocuments.push(document);
            })

            this.setState({productDocs: productDocuments})
        }

    }

  
    public render(){
        const {classes} = this.props;

        return (
            <div className="DocumemntDetail">
                <div>
                    <Typography variant="title" gutterBottom align="left">
                        Document Details
                    </Typography>
                </div>
                <div>
                    <TextField
                        id="productId"
                        label="Product Id"
                        className={classes.textField}
                        value={this.state.productId}
                        onChange={this.setValue.bind(this, 'productId')}
                        margin="normal"
                    />
                     <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </div>
                <div>
                    <SimpleTileView productDocuments={this.state.productDocs}/>
                </div>
            </div>
        )

    }

}

export default withStyles(styles) (DocumemntDetail)