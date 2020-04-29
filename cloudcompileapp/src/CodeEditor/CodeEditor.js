import React, { Component } from "react";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';

const code = `function add(a, b) {
    return a + b;
  }
  `;

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        var code = this.props.code; 
        this.state = { code }
    }

    render() {
        return (
            <div>
                <Editor
                    value={this.state.code}
                    onValueChange={code => this.setState({ code })}
                    highlight={code => highlight(code, languages.java)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
        );
    }
}

export default CodeEditor;