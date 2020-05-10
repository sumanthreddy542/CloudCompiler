import React, { Component } from "react";
import { Storage } from 'aws-amplify';
//import { Auth } from 'aws-amplify';
import GetFile from "./GetFileContentsComponent";
import "./HtmlStyling.css";

var radioGroup = require('react-radio-group');

class ListFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            selection: '',
            selectionChanged: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    runFile = () => {
        Storage.put('run.txt', this.state.selection)
            .catch(err => console.log(err));
    }

    handleChange = (value) => {
        this.setState({
            selection: 'javafiles/' + value,
            selectionChanged: true
        }, this.runFile);
    }

    async handleSubmit(event) {
        // const tokens = await Auth.currentSession();
        // const userName = tokens.getIdToken().payload['cognito:username'];
        // var listfolder = userName + '/';
        Storage.list('javafiles/')
            .then(result => {
                const arr = result.map(item => {
                    let fileNameKey = item.key.split("/")[1];
                    return fileNameKey;
                })
                this.setState({ value: arr });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <br />
                <button type="button" value="List Files" onClick= {this.handleSubmit}> List Files </button>
                <div>
                    {<radioGroup.RadioGroup name="files" onChange= {this.handleChange}>
                    <ul>
                        {this.state.value.map(item => (
                            <li>
                                <radioGroup.Radio value={item} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    </radioGroup.RadioGroup>}
                </div>
                {this.state.selectionChanged === true && 
                <GetFile fileName= {this.state.selection} />}
            </div>
        );
    }
}

export default ListFiles;
