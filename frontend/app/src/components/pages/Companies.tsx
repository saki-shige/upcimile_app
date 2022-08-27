import React, { FC } from 'react'

import { useHandleGetCompanies } from '../hooks/companies'
import { CardList } from '../layouts/CardList'

import { Card, Box, Typography } from '@mui/material'

const Companies: FC = () => {
  const companies = useHandleGetCompanies()

  return (
    <>
    <Box sx={{ my: 5, px: 10, mx: 'auto' }}>
      <Typography sx={{ textAlign: 'center' }}>
        企業一覧
      </Typography>
    </Box>
    <Card
      sx={{
        backgroundColor: 'white',
        width: '80%',
        maxWidth: 1100,
        py: 10,
        mx: 'auto',
        mb: 10,
        zIndex: 'modal',
        borderRadius: 2
      }}
    >
      {companies !== null && companies &&
        <CardList items={companies} type='companies'/>
      }
    </Card>
    </>
  )
}

export default Companies
