import React from "react";
import { createContext, useState, Dispatch, SetStateAction } from "react";
// import { Company } from "../../interface";

export const AuthContext = createContext({} as {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  currentCompany: any;
  setCurrentCompany: Dispatch<SetStateAction<any>>;
  // [pending]currentcompanyの型を定義したい
  // currentCompany: Company | undefined;
  // setCurrentCompany: Dispatch<SetStateAction<Company | undefined>>;
});

export const AuthProvider = (props: any) =>{
  const{ children } = props;

  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(undefined);
  const value = {
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentCompany,
    setCurrentCompany
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

