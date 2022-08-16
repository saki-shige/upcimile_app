import React from "react";
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Company } from "../../interface";
import { Creator } from "../../interface";


export const AuthContext = createContext({} as {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  currentCompany: Company | undefined;
  setCurrentCompany: Dispatch<SetStateAction<Company>> | Dispatch<SetStateAction<undefined>>;
  currentCreator: Creator | undefined;
  setCurrentCreator: React.Dispatch<React.SetStateAction<Creator>> | React.Dispatch<React.SetStateAction<undefined>>;
  idToken: string | undefined;
  setIdToken: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<undefined>>;
});

export const AuthProvider = (props: any) =>{
  const{ children } = props;

  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(undefined);
  const [currentCreator, setCurrentCreator] = useState(undefined);
  const [idToken, setIdToken] = useState();
  const value = {
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentCompany,
    setCurrentCompany,
    currentCreator,
    setCurrentCreator,
    idToken,
    setIdToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

