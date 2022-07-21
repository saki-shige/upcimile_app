import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { Company } from "./interface/index";


export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentCompany: Company | undefined
  setCurrentCompany: React.Dispatch<React.SetStateAction<Company | undefined>>
})

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
