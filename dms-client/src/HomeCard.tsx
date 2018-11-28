import * as React from 'react'
//import PropTypes from 'prop-types'
import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import history from './index'


const styles = (theme: Theme) => createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      // ⚠️ object-fit is not supported by IE11.
      objectFit: 'cover',
    },
  });
  


class Homecard extends React.Component<WithStyles<typeof styles>, {}>{

   constructor(props){
       super(props);
       this.handleClick = this.handleClick.bind(this);
   }

   handleClick(){
       history.push("/org");
   }
   
    render(){
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
            
                <CardMedia
                    component="img"
                    className={classes.media}
                    
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Lizard
                    </Typography>
                    
                </CardContent>
            
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary" onClick={this.handleClick}>
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        );

        
    } 


}

export default withStyles(styles)(Homecard);
