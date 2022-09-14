import React, { FC, useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@mui/material'
import { MessageContext } from '../providers/MessageProvider'

export const MessageSnackbar: FC = () => {
  const { open, setOpen, setMessage, message, severity } = useContext(MessageContext)

  const handleClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void = (event, reason?) => {
    setOpen(false)
    setMessage('')
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
            {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
