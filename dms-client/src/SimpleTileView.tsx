import * as React from "react";
import { createStyles, WithStyles, GridList, withStyles, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
//import SimpleImageDisplay from "./SimpleImageDisplay";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';


const styles = theme => createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });
  

interface Props extends WithStyles<typeof styles>{
    productDocuments: any[]
}

interface State {

}


class SimpleTileView extends React.Component<Props, State>{

    handleFileUpload = (event) => {
        alert ("File to be uploaded : " + event.target.files[0].name );
        
        const form = new FormData();
        form.append("key", event.target.files[0].name);
        form.append("file", event.target.files[0]);
        // form.append("acl" , "public-read");
        // form.append("X-Amz-Credential", "AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request");
        // form.append("X-Amz-Algorithm" , "AWS4-HMAC-SHA256");
        // form.append("X-Amz-Date" , "20151229T000000Z");

        axios.post("http://cs-showcase-bucket-raw-dev.s3.amazonaws.com/", form, { headers: {'Content-Type': 'multipart/form-data' }}
        )
            .then(res => {
                alert ("Success image upload");
            })
            .catch(function(error){
                alert("Error while calling API" + error);
            });



    }

    public render (){
        const { classes } = this.props;

        return (
            <div>
                <GridList className={classes.gridList} cols={2.5}>
                    {this.props.productDocuments.map(document => (
                        <GridListTile key={document['url']}>
                            <img src={document['url']} width="100"></img>
                            <GridListTileBar
                                title={document['description']}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                            }}
                            actionIcon={
                                <IconButton>
                                    <StarBorderIcon className={classes.title} />
                                    upload
                                    <input type="file" onChange={this.handleFileUpload}></input>
                                </IconButton>
                            }
                            />

                        </GridListTile>

                    ))}
                </GridList>
            </div>
        )
    }
}

export default withStyles(styles) (SimpleTileView)