import React, { useState } from 'react'

import { Box, Button, Container, Typography } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'

import { CategoriesList } from '../../lib/api/categories'
import { CardList } from '../layouts/CardList'
import { useHandleGetProducts } from '../hooks/products'
import { StyledIndexBackground, StyledTitleBox } from '../styled/Styled'

const Products: React.FC = () => {
  const [category, setCategory] = useState<number | undefined>()
  const products = useHandleGetProducts({ category })

  return (
      <StyledIndexBackground>
        <Box sx={{ mb: 5 }}>
          <StyledTitleBox>
            <Typography
              variant='subtitle2'
            >
              <DiamondIcon />{' PRODUCTS '}<DiamondIcon />
            </Typography>
            <Button
              onClick={() => setCategory(undefined) }
              disabled={category === undefined}
            >
              すべてのカテゴリー
            </Button>
            <Container sx={{ textAlign: 'center' }}>
            {CategoriesList.map((item) => (
              <Button
                key={`category_${item.value}`}
                onClick={() => setCategory(item.value)}
                disabled={category === item.value}
              >
              {item.label}
              </Button>
            ))}
            </Container>
          </StyledTitleBox>
        </Box>
        {(products != null) && (
          <CardList items={products} type='products'/>
        )}
      </StyledIndexBackground>
  )
}

export default Products
