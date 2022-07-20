import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />;
        <Route path='/signin' element={<SignIn />} />;
        <Route path='/signup' element={<SignUp />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
