import React, { FC, createContext, useState } from 'react'

export const MessageContext = createContext({} as {
  open: boolean
  setOpen: (value: boolean) => void
  message: string | undefined
  setMessage: (value: string) => void
  severity: 'error' | 'success'
  setSeverity: (value: 'error' | 'success') => void
})

export const MessageProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()
  const [severity, setSeverity] = useState<'error' | 'success'>('error')
  const value = {
    open,
    setOpen,
    message,
    setMessage,
    severity,
    setSeverity
  }

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  )
}
