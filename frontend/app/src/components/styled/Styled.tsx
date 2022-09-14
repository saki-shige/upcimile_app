import { Box, Card } from '@mui/material'
import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
}

export const StyledTitleBox: FC<Props> = ({ children }) => (
  <Box
  sx={{
    width: '100%',
    display: 'flex',
    color: 'primary.dark',
    bgcolor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    {children}
    </Box>
)

export const StyledIndexBackground: FC<Props> = ({ children }) => (
  <Box sx={{ width: '100%', mx: 0, bgcolor: '#ECE4DC' }}>
  <Card
    sx={{
      width: '80%',
      py: 3,
      mx: 'auto',
      my: 8,
      zIndex: 'modal',
      borderRadius: 2
    }}
  >
    {children}
  </Card>
  </Box>
)

export const StyledNoImageBox: FC<Props> = ({ children }) => (
  <Box
    sx={{
      aspectRatio: '4/3',
      width: '100%',
      bgcolor: 'primary.light',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </Box>
)
