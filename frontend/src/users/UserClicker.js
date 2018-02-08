import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";


class UserClicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        clicks: 0, 

    // part of the addition 
        costOfAddition: 10 , 
        usedAddition: false, 
        increment:1, 
  
        
      // part of the multiplication 
   
        costOfMultiplier: 100, 
        usedMultiplier:false , 
        multiplier: .02, 
        multiplyCostBy: 1
      };
    }

  componentDidMount() {
    axios
      .get(`/users/clicks`, { username: this.props.username })
      .then(res => {
        console.log("got clicks:", res);
        this.setState({
          clicks: res.data.clicks || 0
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick = e => {
    let { clicks, increment } = this.state;
    clicks += increment;
    this.setState({
      clicks
    });
    axios
      .patch(`/users/clicks`, {
        username: this.props.username,
        clicks: clicks
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  handleAddition = e=>{
    let {clicks, increment,  costOfAddition,usedAddition}= this.state
    if (clicks >= costOfAddition){
      clicks -=costOfAddition
    
      usedAddition= true
      increment +=1
    } 
    this.setState({
        increment:increment, 
        clicks: clicks, 
        costOfAddition: costOfAddition * increment, 
        usedAddition:usedAddition
        
    })
    this.setState({
       increment:increment, 
        clicks: clicks, 
        costOfAddition: costOfAddition * increment, 
      usedAddition:false
    })

  }

    handleMultiplication = e=>{
    let {clicks, multiplier,  costOfMultiplier, usedMultiplier , multiplyCostBy}= this.state
    if (clicks >= costOfMultiplier){
      clicks -=costOfMultiplier
      usedMultiplier= true
      multiplier +=.005
      multiplyCostBy+=.25
      
    } 
    this.setState({
      multiplier: multiplier,
      clicks: clicks,
      costOfMultiplier: costOfMultiplier * multiplyCostBy,
      usedMultiplier: true

    })
    
    setInterval(() => {
      let { clicks, multiplier , costOfMultiplier} = this.state;
      clicks += (clicks * multiplier)
      console.log(typeof (multiplier))
      console.log(this.state)
      this.setState({
        clicks, 
        multiplier,
        costOfMultiplier
      })
    }, 1000);
    
    this.setState({
      multiplier: multiplier,
      clicks: clicks,
      costOfMultiplier: costOfMultiplier * multiplyCostBy,
      usedMultiplier: false

    })

  }



  log = () => console.log(this.state)
      
render() {
    const { clicks, costOfAddition, costOfMultiplier, usedAddition, usedMultiplier, } = this.state;
    console.log(this.state)
    return (
      <div >
          <button onClick={this.log}>Log</button>
        <h1> Click Counter: {clicks.toFixed(4)} </h1>

        //here we are adding by the physical click {' '}
       <p> 
          <button name='physicalClick' onClick={this.handleClick}>
          {" "}
          + HERE{" "}
        </button>


      </p>
        //here we are going to do a timer by second and how much we want to do ants by that second
        

        <p> to initialize addition pay {costOfAddition} clicks  {''}
        {clicks >=costOfAddition ? 
            <button name='auto multiple' onClick={this.handleAddition} disabled={usedAddition} > 
          {" "}
          +  Double the clicker!{" "}
            </button> 
            : <button name='auto multiple' disabled>
              {" "}
              +   Double the clicker!{" "}
            </button>
        }

        </p> 


      <p> to initialize multiplier pay {costOfMultiplier} {''}
      {clicks >=  costOfMultiplier ? 
        <button name='auto multiple' onClick={this.handleMultiplication} disabled= {usedMultiplier}>
          {" "}
          + Use Multiplier!{" "}
        </button> : 
        <button name='auto multiple' onClick={this.handleMultiplication} disabled>
          {" "}
          + Use Multiplier!{" "}
        </button> 
  }
        </p>


       
      </div>
    );
  }
}  
  

export default UserClicker;
