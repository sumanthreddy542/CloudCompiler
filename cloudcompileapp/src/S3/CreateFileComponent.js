import React, { Component } from "react";
import {Storage} from 'aws-amplify';
import "./HtmlStyling.css";

class CreateFile extends Component { 

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
     
    handleChange(event) {
        this.setState({ value: event.target.value + '.java'});
    }

    handleSubmit(event) {
        Storage.put(this.state.value, "//java source file")
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };
     
    render() { 
      return ( 
          <div>
            <label>  Name:
            <input type="text" onChange={this.handleChange}/>
            </label>
            <button type="button" value="Submit" onClick={this.handleSubmit} />
          </div>
      ); 
    } 
  } 
  
  export default CreateFile;