import React from 'react';
import './App.css';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut, AmplifyButton, AmplifyGreetings } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import CreateFile from './S3/CreateFileComponent';
import ListFiles from './S3/ListFilesComponent';
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
    </div>
  );
}

export default withAuthenticator(App);
