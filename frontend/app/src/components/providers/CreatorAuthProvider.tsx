import React, {FC} from "react";
import { createContext, useState } from "react";
import { Creator } from "../../interface";


export const CreatorAuthContext = createContext({} as {
  isCreatorSignedIn: boolean;
  setIsCreatorSignedIn: (value: boolean) => void;
  currentCreator: Creator | undefined;
  setCurrentCreator: (value: Creator) => void
  accessToken: string | undefined;
  setAccessToken: (value: string) => void;
});

export const CreatorAuthProvider: FC<{children: React.ReactNode}> = ({ children }) =>{

  const [isCreatorSignedIn, setIsCreatorSignedIn] = useState(false);
  const [currentCreator, setCurrentCreator] = useState<Creator>();
  const [accessToken, setAccessToken] = useState<string>();
  const value = {
    isCreatorSignedIn,
    setIsCreatorSignedIn,
    currentCreator,
    setCurrentCreator,
    accessToken,
    setAccessToken,
  }

  return (
    <CreatorAuthContext.Provider value={value}>
      {children}
    </CreatorAuthContext.Provider>
  );
};

