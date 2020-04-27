import React from 'react';
import './App.css';
import Auth, {API} from 'aws-amplify';
import awsconfig from './aws-exports'
import { withAuthenticator, AmplifySignOut, AmplifyButton, AmplifyGreetings } from '@aws-amplify/ui-react';
//import { Connect } from 'aws-amplify-react';
Auth.configure(awsconfig);


function App() {
  console.log("Test");
  const testApiResponse = async apiCall => {await API.get("CloudProjectBackendApi", "/items")};
  console.log(testApiResponse);
  return (
    <div className="App">
      <ADSADSA></ADSADSA>
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
//export default App;
