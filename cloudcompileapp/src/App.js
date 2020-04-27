import React from 'react';
import './App.css';
import Auth, {API} from 'aws-amplify';
import awsconfig from './aws-exports'
import { withAuthenticator, AmplifySignOut, AmplifyButton, AmplifyGreetings } from '@aws-amplify/ui-react';
//import Test from './Test';
//import { Connect } from 'aws-amplify-react';
Auth.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <AmplifyGreetings><AmplifySignOut/></AmplifyGreetings>
        <div>
          <AmplifyButton> List projects</AmplifyButton>
        </div>
        <div>
        </div>
    </div>
  );
}

export default withAuthenticator(App);
