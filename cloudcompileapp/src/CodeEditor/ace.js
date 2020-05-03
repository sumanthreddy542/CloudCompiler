import React, { Component } from 'react';
import AceEditor from 'react-ace';
import {Storage} from 'aws-amplify';
import { Auth} from 'aws-amplify';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/eclipse';


export default class Editor2 extends Component {
   
    constructor(props) {
        super(props);
        var code = this.props.code; 
        var pname=this.props.pname;
        
        this.state = { code ,responseValue:'',consoleValue:''}
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange = (newValue) => {
        this.setState({
          code: newValue
        });
      }
    

    async handleSubmit(event) {
        const tokens = await Auth.currentSession();
         const userName = tokens.getIdToken().payload['cognito:username'];

  /*     Storage.remove(this.props.pname)
        .then(result => console.log(result))
        .catch(err => console.log(err)); */

       Storage.put(this.props.pname, this.state.code)
       .then(result => console.log(result))
       .catch(err => console.log(err));
      
       var out_file=this.props.pname;
       out_file=out_file.replace(/\.[^/.]+$/, "");

       console.log(out_file);
       const out_path=out_file+'_output.log';
       const console_path=out_file+'_console.log';


       var response = await Storage.get(out_path, {download: true})
       .catch(err => console.log(err));
       this.setState({responseValue: response.Body})
       console.log(this.state.responseValue);

       var response = await Storage.get(console_path, {download: true})
       .catch(err => console.log(err));
       this.setState({consoleValue: response.Body})



    };
  render() {
    return (
      <div>
           <button id="red-button" type="button" value="OpenInEditor" onClick={this.handleSubmit} >Save and Run</button>
           <br/>
           <br/>
           <div id="out">
            <h5>Output</h5>
            <p>{this.state.consoleValue}</p>
            <p>{this.state.responseValue}</p>
           </div>
        <AceEditor  onChange={(value) => {this.handleChange(value)}} value={this.state.code} mode="java" theme="eclipse"   />
      </div>
    );
  }
}