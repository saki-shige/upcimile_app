import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Typography, Container, Box } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'

import { useHandleGetSingleCompany } from '../hooks/companies'
import { IntroductionCard } from '../layouts/IntroductionCard'
import { CardList } from '../layouts/CardList'
import { CompanyIntroduction } from '../layouts/CompanyIntroduction'

const SingleCompany: FC = () => {
  const { id } = useParams<{id: string}>()
  const company = useHandleGetSingleCompany(id)

  return (
    <>
    {(company != null)
      ? (
      <IntroductionCard avatarImage={(company.image != null) ? company.image.url : 'image'}>
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <CompanyIntroduction company={company} />
        </Container>

        <Container sx={{ pb: 8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2" mb={5}>
              <DiamondIcon />
              {`${company.name}の商品`}
              <DiamondIcon />
            </Typography>
          </Box>
          {(company.products != null && (company.products.length > 0))
            ? (
            <CardList items={company.products} type='products'></CardList>
              )
            : (
              <Typography variant="body2" textAlign={'center'}>商品が登録されていません</Typography>)}
        </Container>
      </IntroductionCard>
        )
      : 'no company infomation'}
    </>
  )
}

export default SingleCompany
