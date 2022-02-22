import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Auth from './views/Auth'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/login' element={<Auth authRoute='login' />} />
        <Route exact path='/register' element={<Auth authRoute='register' />} />
      </Routes>
    </Router>
  );
}

export default App;
