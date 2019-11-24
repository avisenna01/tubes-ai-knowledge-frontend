import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {

    margin: theme.spacing(3),

  },
}));

function App() {
  const classes = useStyles();

  const inputFile = (e) => {
    let files = e.target.files;
    console.log(files)
  }

  return (
    <div className="app">
      <div className="upper-container">
        <div>
          <p className="container-title">Source Image</p>
          <div className="image-container">

            <img alt="image source" src="" />
          </div>
        </div>
        <div>
          <p className="container-title">Detection Image</p>
          <div className="image-container">

            <img alt="shape" src="" />
          </div>
        </div>
      </div>
      <div className="lower-container">
        <div>
          <p className="container-title">Detection Result</p>
          <div className="image-container">


          </div>
        </div><div>
          <p className="container-title">Matched Facts</p>
          <div className="image-container">


          </div>
        </div><div>
          <p className="container-title">Hit Rules</p>
          <div className="image-container">


          </div>
        </div>
      </div>
      <div className="button-container">
        <input type="file" name="Open Image" onChange={(e) => inputFile(e)} />
        <Button className={classes.root} variant="contained" color="primary">
          Open Rule Editor
      </Button>
        <Button className={classes.root} variant="contained" color="secondary">
          Show Rules
      </Button>
        <Button className={classes.root} variant="contained" color="primary">
          Show Facts
      </Button>
      </div>
    </div>
  );
}

export default App;
