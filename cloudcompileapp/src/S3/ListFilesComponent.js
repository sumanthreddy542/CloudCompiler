import React, { Component } from "react";
import {Storage} from 'aws-amplify';
//import "./HtmlStyling.css";

class ListFiles extends Component { 

    constructor(props) {
        super(props);
        this.state = {value: []};
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    handleSubmit(event) {
        Storage.list('')
            .then(result => {
                const arr = result.map(item => {
                    return item.key;
                })
                this.setState({value: arr});
            })
            .catch(err => console.log(err));
    };
     
    render() { 
      return ( 
          <div>
              <button type="button" value="List" onClick={this.handleSubmit} />
              <ul>
                  {this.state.value.map(item => (
                      <li key = {item} className = "checkbox">
                          <label>
                              <input type = "checkbox" name = {item}/>
                              {item}
                          </label>
                      </li>
                  ))}
              </ul>
          </div>
      ); 
    } 
  } 
  
  export default ListFiles;