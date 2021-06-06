import React, { useState, useEffect } from 'react'
import './App.css';
import * as ReactBootstrap from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'


function App() {

  const [time, setTime] = useState([]);
  const [click, setClick] = useState(0);
  // const [randomNum, setRandomNum] = (3);
  const saveData = () => {
    const obj = {
      numClick: click,
      dateCreated: time
    }
    const axios = require('axios');

    axios.post('http://localhost:3000/data', obj)
    .then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });   
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(prevArray => {
      const dateNow = Date.now();
      const today = new Date(dateNow);
      // setRandomNum(Math.round((Math.random() * 100) / 3) * 3);
      return [...prevArray, today.toLocaleDateString('en-US')];
    }), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
      <div className="App">
        <h1 className="App-h1">React Table</h1>
        <div style={{textAlign: 'left', marginBottom: '20px'}}>
          <Button variant="primary" onClick={saveData}>Save</Button>
          </div>
        <ReactBootstrap.Table>
          <thead>
            <tr>
              <th>
                Date
              </th>
              <th>
                Random Num.
              </th>
              <th>
                No. of clicks
              </th>
            </tr>
          </thead>
          <tbody>
            { time.map((item, i) => (
              <tr onClick={() => setClick(click + 1)} key={i}>
                <td>
                  {item}
                </td>
                <td>
                  {Math.round((Math.random() * 100) / 3) * 3}
                </td>
                <td>
                  {click}
                </td>
              </tr>    
            ) ) }
          </tbody>
        </ReactBootstrap.Table>
      </div>
  );
}
export default App;