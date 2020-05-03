import React, { Component } from "react";
import {Storage} from 'aws-amplify';
import CodeEditor from '../CodeEditor/CodeEditor';
import Editor2 from '../CodeEditor/ace';
import Editor from '../CodeEditor/CodeEditor'
import "./HtmlStyling.css";

class GetFile extends Component { 

    constructor(props) {
        super(props);
        var pname=this.props.pname;
        this.state = {value: '',pname};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    async handleSubmit(event) {
        var response = await Storage.get(this.props.pname, {download: true})
            .catch(err => console.log(err));
        this.setState({pname:this.props.pname})

        this.setState({value: response.Body})
    };
     
    render() { 
      return (
        
          <div id="button-div">
           
            <button id="blue-button" type="button" value="OpenInEditor" onClick={this.handleSubmit} >Select Project</button>
          
            


            {this.state.value != '' && <Editor2 code= {this.state.value} pname={this.state.pname}/>}
            

            
            {this.state.value != '' && <Editor2 /> && <CodeEditor code= {this.state.value} />} 
          </div>
          
            
      ); 
    } 
  } 
  
  export default GetFile;