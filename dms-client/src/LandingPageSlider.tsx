import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const tutorialSteps = [
  {
    label: 'How to be happy :)',
    imgPath: 'https://s3.amazonaws.com/lambda-image-raw/1522573043274_1.jpg',
  },
  {
    label: '1. Work with something that you like, like…',
    imgPath: 'https://s3.amazonaws.com/lambda-image-raw/1522573043274_1.jpg',
  },
  {
    label: '2. Keep your friends close to you and hangout with them',
    imgPath: 'https://s3.amazonaws.com/lambda-image-raw/1522573043274_1.jpg',
  },
  {
    label: '3. Travel everytime that you have a chance',
    imgPath: 'https://s3.amazonaws.com/lambda-image-raw/1522573043274_1.jpg',
  },
  {
    label: '4. And contribute to Material-UI :D',
    imgPath: 'https://s3.amazonaws.com/lambda-image-raw/1522573043274_1.jpg',
  },
];


class LandingPageSlider extends React.Component {

  render() {
    

    return (
      <div>
        <Paper square elevation={0}>
          <Typography>{tutorialSteps[0].label}</Typography>
        </Paper>
        <img
         
          src={tutorialSteps[0].imgPath}
          alt={tutorialSteps[0].label}
        />
        
      </div>
    );
  }
}



export default (LandingPageSlider);