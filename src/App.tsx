import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';


//import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasPage } from './pages/KatasPages';
import { KatasDetailPage } from './pages/KatasDetail.Pages';


function App() {
  return (
    <div className="App">
      {/*render Login Form*/}
      {/* <LoginForm/> */}
      {/* <RegisterForm/> */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/katas'>Katas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Routes definition */}
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/katas' element={<KatasPage/>}></Route>
          <Route path='/katas/:id' element={<KatasDetailPage/>}></Route>
          {/* Redirect to when Page not found */}
          <Route path='*' element={<Navigate to='/' replace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
