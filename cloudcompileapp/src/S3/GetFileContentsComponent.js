import React, { Component } from "react";
import {Storage} from 'aws-amplify';
import CodeEditor from '../CodeEditor/CodeEditor'
import "./HtmlStyling.css";

class GetFile extends Component { 

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    async handleSubmit(event) {
        var response = await Storage.get('sa.java', {download: true})
            .catch(err => console.log(err));

        this.setState({value: response.Body})
    };
     
    render() { 
      return ( 
          <div>
            <button type="button" value="OpenInEditor" onClick={this.handleSubmit} />
            {this.state.value != '' && <CodeEditor code= {this.state.value}/>}
          </div>
      ); 
    } 
  } 
  
  export default GetFile;