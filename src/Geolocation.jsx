import React from 'react'

class Geolocation extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             latitude:null,
             longitude:null,
             userAddress:null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this)
    }
  
    getLocation(){
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(this.getCoordinates);
        }else{
            alert("Geolocation is not supported by this browser")
        }
    }
    getCoordinates(pos){
        console.log("esssss",pos)
            this.setState({
                latitude:pos.coords.latitude,
                longitude:pos.coords.longitude
            })
    }

    render(){
        return (
            <div>
                <h2>React Geolocation Example</h2>
                
            <button onClick={this.getLocation}>Get Coordinates</button>
            <h4>Coordinates</h4>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude:{this.state.longitude}</p>
            <h4>Google Maps Reverse Geocoding</h4>
            <p>Envelop
                {this.state.userAddress}
            </p>
            
            
            </div>
        )
    }
    
}

export default Geolocation