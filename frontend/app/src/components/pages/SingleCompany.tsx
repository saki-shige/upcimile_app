import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Typography, Container, Box } from '@mui/material'

import { useHandleGetSingleCompany } from '../hooks/companies'
import { IntroductionCard } from '../layouts/IntroductionCard'
import { CardList } from '../layouts/CardList'
import { CompanyIntroduction } from '../layouts/CompanyIntroduction'

const SingleCompany: FC = () => {
  const { id } = useParams<{id: string}>()
  const company = (id != null) ? useHandleGetSingleCompany(id) : undefined

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
            <Typography variant="h6" color="inherit" paragraph>
              {`${company.name}の商品`}
            </Typography>
          </Box>
          {(company.products != null)
            ? (
            <CardList items={company.products} type='products'></CardList>
              )
            : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
        )
      : 'no company infomation'}
    </>
  )
}

export default SingleCompany
