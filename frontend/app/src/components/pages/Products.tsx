import React from 'react'
import { Card, Box, Typography } from '@mui/material'

import { CardList } from '../layouts/CardList'
import { useHandleGetProducts } from '../hooks/products'

const Products: React.FC = () => {
  const products = useHandleGetProducts()

  return (
    <>
      <Box sx={{ my: 5, px: 10, mx: 'auto' }}>
        <Typography sx={{ textAlign: 'center' }}>
          商品一覧
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
        <>
        {(products != null) && (
          <CardList items={products} type='products'/>
        )}
        </>
      </Card>
    </>
  )
}

export default Products
