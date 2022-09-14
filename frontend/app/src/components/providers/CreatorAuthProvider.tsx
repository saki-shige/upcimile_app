import React, { FC, createContext, useState } from 'react'
import { Creator } from '../../interface'

export const CreatorAuthContext = createContext({} as {
  isCreatorSignedIn: boolean
  setIsCreatorSignedIn: (value: boolean) => void
  currentCreator: Creator | undefined
  setCurrentCreator: (value: Creator) => void
  currentAccessToken: string | undefined
  setCurrentAccessToken: (value: string) => void
})

export const CreatorAuthProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [isCreatorSignedIn, setIsCreatorSignedIn] = useState(false)
  const [currentCreator, setCurrentCreator] = useState<Creator>()
  const [currentAccessToken, setCurrentAccessToken] = useState<string>()
  const value = {
    isCreatorSignedIn,
    setIsCreatorSignedIn,
    currentCreator,
    setCurrentCreator,
    currentAccessToken,
    setCurrentAccessToken
  }

  return (
    <CreatorAuthContext.Provider value={value}>
      {children}
    </CreatorAuthContext.Provider>
  )
}
