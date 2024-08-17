import React from 'react';
import Header from './components/header/Header'; 
import Main from './components/main/Main'; 


function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Main />
      </div>
    </div>
  );
}

export default App;

