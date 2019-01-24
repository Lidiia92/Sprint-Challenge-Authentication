import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar.js";
import JokesList from './components/JokesList';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { Route } from 'react-router-dom';

class App extends Component {

  signout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  visitPage = () => {
    window.location='http://localhost:3000/jokes';
  }

  render() {
    return (
      <div >
        <header>
          <NavBar signout={this.signout}/>
        </header>
        <main>

        <Route path="/" exact render={props => <h2>Hello from the Home Page</h2>} />

        <Route 
          path="/jokes" 
          render={props => <JokesList /> } /> 

        <Route 
          path="/login" 
          render={props => <Login visitpage={this.visitPage}/> } /> 

        <Route 
          path="/register" 
          render={props => <Register visitpage={this.visitPage}/> } /> 

        </main>
      </div>
    );
  }
}

export default App;
