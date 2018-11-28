import * as React from 'react';

import {Route, Switch} from 'react-router-dom'
import { Grid } from '@material-ui/core';
import HomeCard from './HomeCard';
import OrgDetail from './OrgDetail'



<Switch>
  <Route  exact path='/org' component={OrgDetail}/>
</Switch>

const tiers = [
  {
    title: "Manage Organization",
    imageUrl: ""
  },
  {
    title: "Manage Product",
    imageUrl: ""
  },
  {
    title: "Manage Product Details",
    imageUrl: ""
  }
];

const divStyle = {
  color: 'blue',
  borderColor: 'red',
  borderStyle: 'solid double',

};

class HomePage extends React.Component {
  public render() {
    return (
      <div className="homePage" style={divStyle}>
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier =>(
            <Grid key={tier.title} xs={12} sm={12} md={4}>
              <HomeCard />
            </Grid>
          ))};
        </Grid>
      </div>
    );
  }
}

export default HomePage;
