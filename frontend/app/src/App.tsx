import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Box } from '@mui/material';

import {appTheme} from './assets/theme/theme';
import ResponsiveAppBar from './components/layouts/ResponsiveAppBar';
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';
import CompanySignIn from './components/pages/CompanySignIn';
import CompanySignUp from './components/pages/CompanySignup';
import Products from './components/pages/Products';
import SingleProduct from './components/pages/SingleProduct';
import CreateProduct from './components/pages/CreateProduct';
import EditProduct from './components/pages/EditProduct';
import Companies from './components/pages/Companies';
import SingleCompany from './components/pages/SingleCompany';
import EditCompany from './components/pages/EditCompany';
import CompanyMyPage from './components/pages/CompanyMypage';
import CreatorSignIn from './components/pages/CreatorSignin';
import Creators from './components/pages/Creators';
import SingleCreator from './components/pages/SingleCreator';
import CreatorMyPage from './components/pages/CreatorMyPage';

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
          <Route path='/companies/signin' element={<CompanySignIn />} />;
          <Route path='/companies/signup' element={<CompanySignUp />} />;
          <Route path='/products' element={<Products />} />;
          <Route path='/products/:id' element={<SingleProduct />} />;
          <Route path='/products/new' element={<CreateProduct />} />;
          <Route path='/products/edit/:id' element={<EditProduct />} />;
          <Route path='/companies' element={<Companies />} />;
          <Route path='/companies/:id' element={<SingleCompany />} />;
          <Route path='/companies/edit/:id' element={<EditCompany />} />;
          <Route path='/creators/signin' element={<CreatorSignIn />} />;
          <Route path='/creators' element={<Creators />} />;
          <Route path='/creators/:id' element={<SingleCreator />} />;
          <Route path='/creators/mypage' element={<CreatorMyPage />} />;
          <Route path='/companies/mypage' element={<CompanyMyPage />} />;
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
