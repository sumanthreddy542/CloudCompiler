import React, { Component } from "react";
import { Storage } from 'aws-amplify';
import "./HtmlStyling.css";
import AceCodeEditor from "../CodeEditor/ace";

class GetFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      fileName: this.props.fileName
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    this.state.value = '';
    let response = await Storage.get(this.props.fileName, { download: true })
      .catch(err => console.log(err));
    this.setState({ 
      value: response.Body
     })
  };


  render() {
    return (
      <div id="button-div">
        <button id= "blue-button" type= "button" value= "OpenInEditor" onClick= {this.handleSubmit}> Open File in Editor </button>

        {this.state.value !== '' && <AceCodeEditor code= {this.state.value} fileName= {this.props.fileName}/>}
      </div>
    );
  }
}

export default GetFile;