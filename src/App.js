import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import clp from "./shape.txt"

var fs = require("fs");
// var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/++[++^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

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
      let encodeData = res.data.data
      // let decodeData = Base64.decode(encodeData)
      // fs.writeFile("shape.txt", decodeData, (err) => {
      //   if (err) console.log(err);
      //   console.log("Successfully Written to shape.txt");
      // });
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
      let encodeData = res.data.data
      // let decodeData = Base64.decode(encodeData)
      // fs.writeFile("facts.txt", decodeData, (err) => {
      //   if (err) console.log(err);
      //   console.log("Successfully Written to facts.txt");
      // });
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