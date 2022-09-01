import React from 'react'

import { Box, Typography } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'

import { CardList } from '../layouts/CardList'
import { useHandleGetProducts } from '../hooks/products'
import { StyledIndexBackground, StyledTitleBox } from '../styled/Styled'

const Products: React.FC = () => {
  const products = useHandleGetProducts()

  return (
      <StyledIndexBackground>
        <Box sx={{ mb: 5 }}>
          <StyledTitleBox>
            <Typography
              variant='subtitle2'
            >
              <DiamondIcon />{' PRODUCTS '}<DiamondIcon />
            </Typography>
          </StyledTitleBox>
        </Box>
        {(products != null) && (
          <CardList items={products} type='products'/>
        )}
      </StyledIndexBackground>
  )
}

export default Products
