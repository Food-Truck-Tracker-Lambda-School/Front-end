import React from 'react';
import { Switch , Route } from 'react-router-dom'
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login'
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/registration' render={() =><Registration /> }/>
        <Route path='/login' render={() => <Login /> }/>
        <Route exact path='/' render={() => <HomePage />} />
      </Switch>
    </>
  );
}

export default App;
