import * as React from "react";
import { createStyles, Theme, WithStyles, withStyles, CardMedia } from "@material-ui/core";
import { Card } from "mdi-material-ui";

const styles = (theme: Theme) => createStyles({
    card: {
      maxWidth: 200,
      height: 140,
      width: 200
    },
    media: {
      height: 140,
      width: 200
      //paddingTop: '56.25%', // 16:9
    }
   
  });
  

interface Props extends WithStyles<typeof styles>{
        document: {}
}

interface State {

}


class SimpleImageDisplay extends React.Component<Props, State>{


    public render(){
        const { classes } = this.props;

        return (
            <div id={"product_"+this.props.document['docConfId']} >
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        src={this.props.document['url']}
                        title={this.props.document['description']}
                    />
                    </Card>
            </div>
        ) 
    }

}

export default withStyles(styles) (SimpleImageDisplay)