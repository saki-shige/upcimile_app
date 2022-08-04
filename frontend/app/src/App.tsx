import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import ResponsiveAppBar from './components/layouts/ResponsiveAppBar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Products from './components/pages/Products';
import SingleProduct from './components/pages/SingleProduct';
import CreateProduct from './components/pages/CreateProduct';
import Companies from './components/pages/Companies';
import SingleCompany from './components/pages/SingleCompany';
import EditCompany from './components/pages/EditCompany';
import CreatorLogin from './components/pages/CreatorLogin';


function App() {
  return (
    <>
    <CssBaseline />
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />} />;
          <Route path='/signin' element={<SignIn />} />;
          <Route path='/signup' element={<SignUp />} />;
          <Route path='/products' element={<Products />} />;
          <Route path='/products/*' element={<SingleProduct />} />;
          <Route path='/products/new' element={<CreateProduct />} />;
          <Route path='/companies' element={<Companies />} />;
          <Route path='/companies/*' element={<SingleCompany />} />;
          <Route path='/companies/edit/:id' element={<EditCompany />} />;
          <Route path='/creators/login' element={<CreatorLogin />} />;
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
