import * as React from "react";
import { createStyles, WithStyles, GridList, withStyles } from "@material-ui/core";
import SimpleImageDisplay from "./SimpleImageDisplay";


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
   

    public render (){
        const { classes } = this.props;

        return (
            <div>
                <GridList className={classes.gridList} cols={2.5}>
                    {this.props.productDocuments.map(document => (
                        <SimpleImageDisplay document={document} />
                    ))}
                </GridList>
            </div>
        )
    }
}

export default withStyles(styles) (SimpleTileView)