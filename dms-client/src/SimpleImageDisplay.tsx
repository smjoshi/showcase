import * as React from "react";
import { createStyles, Theme, WithStyles, withStyles, Avatar, CardMedia, CardContent, Typography, CardHeader } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Card } from "mdi-material-ui";

const styles = (theme: Theme) => createStyles({
    card: {
      maxWidth: 100,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
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
            <div>
                <Card className={classes.card}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                        R
                        </Avatar>
                    }
                    
                    title="Vehicle Image"
                    />
                    <CardMedia
                    className={classes.media}
                    image={this.props.document['url']}
                    title="Paella dish"
                    />
                    <CardContent>
                    <Typography component="p">
                        Vehicle Image
                    </Typography>
                    </CardContent>
                    </Card>
            </div>
        ) 
    }

}

export default withStyles(styles) (SimpleImageDisplay)