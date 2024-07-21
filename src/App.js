import React from 'react';
import EmailGuesserContainer from './containers/EmailGuesserContainer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Email Guesser</h1>
        <EmailGuesserContainer />
      </header>
    </div>
  );
};

export default App;
