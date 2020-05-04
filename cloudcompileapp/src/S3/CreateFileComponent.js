import React, { Component } from "react";
import { Storage } from 'aws-amplify';
import "./HtmlStyling.css";

class CreateFile extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    // const tokens = await Auth.currentSession();
    // const userName = tokens.getIdToken().payload['cognito:username'];
    // var path=userName+'/'+this.state.value;
    // var consolefilepath=userName+'/'+this.state.var+'_console.log';
    // var outputfilepath=userName+'/'+this.state.var+'_output.log';
    // var classcontent='public class '+this.state.var+'{                       }';
    // console.log(path);
    // Storage.put(this.state.value, "public class Main{                      }")

    let javaFile = 'javafiles/' + this.state.value + ".java";
    let initialFileContent = "public class " + this.state.value + "{ \n public static void main(String[] args) { \n \t} \n }";

    Storage.put(javaFile, initialFileContent)
      .then(result => console.log(result))
      .catch(err => console.log(err));

    // Storage.put(consolefilepath,'')
    // .then(result => console.log(result))
    // .catch(err => console.log(err));

    // Storage.put(outputfilepath,'//Output displays here. Wait...')
    // .then(result => console.log(result))
    // .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <br />
        <label> File Name:
        &nbsp;
            <input type="text" onChange={this.handleChange} />
        </label>
            &nbsp;
        <button type="button" value="Create Project" onClick={this.handleSubmit}> Create Project </button>
      </div>
    );
  }
}

export default CreateFile;