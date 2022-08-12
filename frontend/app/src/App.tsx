import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Box } from '@mui/material';

import {appTheme} from './assets/theme/theme';
import ResponsiveAppBar from './components/layouts/ResponsiveAppBar';
import Footer from './components/layouts/Footer';
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
import Creators from './components/pages/Creators';
import SingleCreator from './components/pages/SingleCreator';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline />
      <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />} />;
          <Route path='/signin' element={<SignIn />} />;
          <Route path='/signup' element={<SignUp />} />;
          <Route path='/products' element={<Products />} />;
          <Route path='/products/:id' element={<SingleProduct />} />;
          <Route path='/products/new' element={<CreateProduct />} />;
          <Route path='/companies' element={<Companies />} />;
          <Route path='/companies/:id' element={<SingleCompany />} />;
          <Route path='/companies/edit/:id' element={<EditCompany />} />;
          <Route path='/creators/login' element={<CreatorLogin />} />;
          <Route path='/creators' element={<Creators />} />;
          <Route path='/creators/:id' element={<SingleCreator />} />;
        </Routes>
        <Footer
        title="UPCIMILE"
        description="upcicle with smile!"
        />
      </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
