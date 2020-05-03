import React, { Component } from "react";
import {Storage} from 'aws-amplify';
import { Auth} from 'aws-amplify';
import GetFile from "./GetFileContentsComponent";
//import "./HtmlStyling.css";

const pname='';
class ListFiles extends Component { 


    constructor(props) {
        super(props);
        this.state = {value: [],selection:''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    handleChange = (newValue) => {
        this.setState({
          selection: newValue.currentTarget.value
        });

      //  pname=this.state.selection;

        console.log(this.state.selection);
      }
    

    async handleSubmit(event) {
        //window.open('/files', "_blank");
        const tokens = await Auth.currentSession();
        const userName = tokens.getIdToken().payload['cognito:username'];
        var listfolder=userName+'/';
        Storage.list(listfolder)
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
              <br/>
              <button type="button" value="List" onClick={this.handleSubmit} >List Projects</button>

              <ul>
                  {this.state.value.map(item => (
                      <li key = {item} className = "radio">
                          <label>
                              <input type = "radio" value={item} onChange={this.handleChange} name = 'item'/>
                              {item}
                          </label>
                      </li>
                  ))}
              </ul>
              <GetFile pname={this.state.selection}/>
          </div>
      ); 
    } 
  } 
  
  export default ListFiles;
  