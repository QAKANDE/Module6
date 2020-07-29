import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from './components/Home'
import StudentDetails from './components/StudentDetails';

function App() {
  return (
    <Router>
    <div className="App">
      <Route  path="/home" component={Home} />
      <Route  path="/details/:id" component={StudentDetails} />
    </div>
    </Router>
  );
}

export default App;
