import React from 'react';
import './App.css';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut, AmplifyGreetings } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import CreateFile from './S3/CreateFileComponent';
import ListFiles from './S3/ListFilesComponent';
import GetFile from './S3/GetFileContentsComponent';
import Editor from './CodeEditor/ace'
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <AmplifyGreetings><AmplifySignOut/></AmplifyGreetings>
        <div>
          <CreateFile/>
        </div>
        <div>
          <ListFiles/>
        </div>
        <div>
         
        </div>     
    </div>
  );
}

export default withAuthenticator(App);
