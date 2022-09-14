import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function Copyright (): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © Upcimile.co  '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

interface FooterProps {
  description: string
  title: string
}

export const Footer: FC<FooterProps> = ({ description, title }) => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}
