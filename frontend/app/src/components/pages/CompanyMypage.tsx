import React, { FC, useContext } from 'react'

import { Typography, CardContent, Container, Box } from '@mui/material'

import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { useHandleGetSingleCompany } from '../hooks/companies'
import { IntroductionCard } from '../layouts/IntroductionCard'
import { CardList } from '../layouts/CardList'
import { BasicTable } from '../layouts/OfferTable'

const CompanyMyPage: FC = () => {
  const { currentCompany } = useContext(CompanyAuthContext)
  const company = (currentCompany != null) ? useHandleGetSingleCompany(String(currentCompany.id)) : undefined

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
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', pb: 5 }}>
              {company.name}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
              {company.introduction}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              住所: {(company.address != null) || 'Unregistered'}<br />
              連絡先: {(company.email != null) || 'Unregistered'}<br />
              創業: {(company.dateOfEstablishment != null) ? company.dateOfEstablishment : 'Unregistered'}<br />
              従業員数: {(company.numberOfEmployees != null) || 'Unregistered'}<br />
              資本金: {(company.capital != null) || 'Unregistered'}<br />
            </Typography>
            <Typography component='a' href={company.corporateSite} variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
              詳しくは企業HPへ
            </Typography>
          </CardContent>
        </Container>

          <Container sx={{ py: 10 }}>
            <BasicTable type='offersToMe'></BasicTable>
          </Container>

        <Container sx={{ pb: 8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="inherit" paragraph>
              {`${company.name}の商品`}
            </Typography>
          </Box>
          {(company.products != null)
            ? (
            <CardList items={company.products} type='products' provider={true}></CardList>
              )
            : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
        )
      : 'no company infomation'}
    </>
  )
}

export default CompanyMyPage
