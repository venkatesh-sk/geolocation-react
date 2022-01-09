import React,{useEffect} from 'react'
import './App.css';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container'
import Geolocation from './Geolocation'

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 600000,
};
const App = () => {
  // const [lat,setLat] = useState(0);
  // const [long,setLong] =useState(0);
  const url = "https://60a38cac7c6e8b0017e273b0.mockapi.io/data"  
 
  // const [ip,setIp] = useState('');

  // const getdata =async()=>{
  //   const res = await axios.get('https://geolocation-db.com/json/')
  //   console.log(res.data);
  //   setIp(res.data.IPv4);
  // }
  function success(pos) {
    var crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);


    var details = [{
      latitude: crd.latitude,
      longitude:crd.longitude,
      accuracy:crd.accuracy
    }];


    fetch(url, {
      "method": "POST",
      body: JSON.stringify(details),
      headers: {
          'Content-type': 'application/json'
      }
  }).then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

      }
  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }

  },[])
  return (
    <div className='App'>
 
    <Geolocation />
    

     


    </div>
  )
}

export default App
