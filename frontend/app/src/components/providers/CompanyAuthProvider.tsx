import React, { FC } from "react";
import { createContext, useState} from "react";
import { Company } from "../../interface";


export const CompanyAuthContext = createContext({} as {
  isCompanySignedIn: boolean;
  setIsCompanySignedIn: (value: boolean) => void;
  currentCompany: Company | undefined;
  setCurrentCompany: (value: Company) => void;
});

export const CompanyAuthProvider: FC<{children: React.ReactNode}> = ({ children }) =>{

  const [isCompanySignedIn, setIsCompanySignedIn] = useState<boolean>(false);
  const [currentCompany, setCurrentCompany] = useState<Company>();
  const value = {
    isCompanySignedIn,
    setIsCompanySignedIn,
    currentCompany,
    setCurrentCompany,
  }

  return (
    <CompanyAuthContext.Provider value={value}>
      {children}
    </CompanyAuthContext.Provider>
  );
};

