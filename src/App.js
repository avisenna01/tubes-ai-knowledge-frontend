import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import clp from "./shape.clp"

var fs = require("fs");

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
}));

function App() {
  const classes = useStyles();

  const [files, setFiles] = useState(null)
  const [dI, setDI] = useState(null)
  const [hR, setHR] = useState(null)
  const [mF, setMF] = useState(null)

  // let optionsState;
  const [optionsState, setOptionsState] = useState(null)
  // console.log(optionsState)

  const handleChange = (event) => {
    console.log(event.target.value)
    setOptionsState(event.target.value)
  }

  const inputFile = (e) => {
    let files = e.target.files;
    setFiles(URL.createObjectURL(files[0]))
    console.log(URL.createObjectURL(files[0]))
    fetch(`{BaseURL}/detect`, {
      method: 'post',
      body: {
        image: files
      }
    })
    // .then(response => {
    //   console.log(response)
    //   data = response.data
    //   setDI(data.detectionImage)
    //   setHR(data.hitRules)
    //   setMF(data.matchedFacts)
    // })
  }

  const onEditRule = (e) => {
    console.log(e)
    console.log(e.target.value)

    fetch('{BaseURL}/changeClips', {
      method: 'post',
      body: {
        clips: clp
      }
    }).then(response => {
      console.log(response)
    })
  }

  const showRules = (e) => {
    fetch('{BaseURL/getRules', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res)
    })
  }

  const showFacts = (e) => {
    fetch('{BaseURL/getFacts', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="app">
      <div className="upper-container">
        <div>
          <p className="container-title">Source Image</p>
          <div className="image-container">
            <img alt="image source" src={files} width="100%" height="100%" />
          </div>
        </div>
        <div>
          <p className="container-title">Detection Image</p>
          <div className="image-container">
            {/* <img alt="shape" src="shape" />
           */}
            {optionsState}
          </div>
        </div>
      </div>
      <div className="lower-container">
        <div>
          <p className="container-title">Detection Result</p>
          <div className="image-container">
            {dI}
          </div>
        </div><div>
          <p className="container-title">Matched Facts</p>
          <div className="image-container">
            {mF}
          </div>
        </div><div>
          <p className="container-title">Hit Rules</p>
          <div className="image-container">
            {hR}
          </div>
        </div>
      </div>
      <div className="button-container">
        <select value={optionsState} onChange={handleChange}>
          <option value="Triangle">Triangle</option>
          <option value="Quadlirateral">Quadlirateral</option>
          <option value="Pentagon">Pentagon</option>
          <option value="Hexagon">Hexagon</option>
        </select>
        <input className={classes.input} accept="image/*"
          id="contained-button-file"
          multiple type="file" name="Open Image" onChange={(e) => inputFile(e)} />
        <label htmlFor="contained-button-file">
          <Button style={{ width: "145px", margin: "0 30px" }} variant="contained" color="outlined" component="span">
            Upload
        </Button>
        </label>
        <Button className={classes.root} variant="contained" color="primary" onClick={onEditRule}>
          Open Rule Editor
      </Button>
        <Button className={classes.root} variant="contained" color="secondary" onClick={showRules}>
          Show Rules
      </Button>
        <Button className={classes.root} variant="contained" color="primary" onClick={showFacts}>
          Show Facts
      </Button>
      </div>
    </div>
  );
}

export default App;