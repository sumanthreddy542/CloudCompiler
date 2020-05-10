import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Storage } from 'aws-amplify';
//import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { subscribeToUpdateCode } from '../graphql/subscriptions';
import { updateCode } from '../graphql/mutations';
import 'brace/mode/java';
// import 'brace/theme/github';
import 'brace/theme/eclipse';

class AceCodeEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: this.props.code,
      fileName: this.props.fileName,
      output: '',
      canPair: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePair = this.handlePair.bind(this);
  }

  createMutation = () => {
    if (this.state.canPair) {
      API.graphql(graphqlOperation(updateCode, { content: this.state.code }));
    }
  }

  handleChange = (newValue) => {
    this.setState({
      code: newValue
    }, this.createMutation);

  }

  sleepMS = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handleSubmit(event) {
    // const tokens = await Auth.currentSession();
    // const userName = tokens.getIdToken().payload['cognito:username'];

    /*     Storage.remove(this.props.pname)
          .then(result => console.log(result))
          .catch(err => console.log(err)); */

    //console.log("test");

    Storage.put(this.state.fileName, this.state.code)
      .catch(err => console.log(err));

    await this.sleepMS(10000);

    let outputFilePath = this.state.fileName.replace(/\.[^/.]+$/, "");
    outputFilePath += '_out.log';
    console.log(outputFilePath);
    var response = await Storage.get(outputFilePath, { download: true })
         .catch(err => console.log(err));
    
    
    
    this.setState({output: response.Body});
    // let output_file = this.state.fileName;
    // //output_file = output_file.replace(/\.[^/.]+$/, "");

    // //console.log(out_file);
    // const outputFilePath = output_file + '_output.log';
    // //const console_path = out_file + '_console.log';
    // var response = await Storage.get(outputFilePath, { download: true })
    //   .catch(err => console.log(err));
    // this.setState({ output: response.Body })
    // console.log(this.state.responseValue);

    // var response = await Storage.get(console_path, { download: true })
    //   .catch(err => console.log(err));
    // this.setState({ consoleValue: response.Body })
  };

  subscribe = () => {
    if (this.state.canPair === true) {
      this.subscription = API.graphql(graphqlOperation(subscribeToUpdateCode))
      .subscribe({
        next: (userCode) => {
          this.setState({
            code: userCode.value.data.subscribeToUpdateCode.content
          })
        }
      });
    }
    else {
      this.subscription.unsubscribe();
    }
  }

  // handleFileChange = () => {
  //   if(this.props.fileSelectionChanged){
  //     this.props.fileSelectionChanged = false;
  //     return true;
  //   }
  //   else
  //     return false;
  // }

  handlePair = () => {
    this.setState({ 
      canPair: !this.state.canPair 
    }, 
    this.subscribe
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.state.code) {
      this.setState({ 
        code: nextProps.code,
        fileName: nextProps.fileName
       });
    }
  }

  render() {
    return (
      <div>
        <br />
        <button id= "green-button" type= "button" value= "Pair Program" onClick= { this.handlePair }> Pair Program </button>
        <button id= "red-button" type= "button" value= "Save and Run" onClick= { this.handleSubmit }> Save and Run </button>
        <br />
        <br />
        <div id="out">
          <h5>Output</h5>
          <p>{this.state.output}</p>
        </div>
        <AceEditor onChange= {(value) => { this.handleChange(value) }} value= {this.state.code} mode= "java" theme= "eclipse" />
      </div>
    );
  }
}

export default AceCodeEditor;