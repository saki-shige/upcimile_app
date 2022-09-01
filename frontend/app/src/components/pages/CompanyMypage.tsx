import React, { FC, useContext, useState } from 'react'

import { Typography, Container, Box, Button } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'
import CelebrationIcon from '@mui/icons-material/Celebration'

import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { useHandleGetSingleCompany } from '../hooks/companies'
import { IntroductionCard } from '../layouts/IntroductionCard'
import { CardList } from '../layouts/CardList'
import { BasicTable } from '../layouts/OfferTable'
import { CompanyIntroduction } from '../layouts/CompanyIntroduction'
import { useNavigate } from 'react-router-dom'

const CompanyMyPage: FC = () => {
  const { currentCompany } = useContext(CompanyAuthContext)
  const [update, setUpdate] = useState(false)
  const company = (currentCompany != null) ? useHandleGetSingleCompany(String(currentCompany.id), update) : undefined
  const navigation = useNavigate()

  return (
    <>
    {(company != null)
      ? (
      <IntroductionCard avatarImage={(company.image != null) ? company.image.url : 'image'}>
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CompanyIntroduction company={company} />
          <Button onClick={() => { navigation(`/companies/edit/${company.id}`) }} >
            登録情報を編集する
          </Button>
        </Container>

          <Container sx={{ py: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2">
              <CelebrationIcon />
                あなたへのオファー
              <CelebrationIcon />
            </Typography>
            </Box>
            <BasicTable type='offersToMe' />
          </Container>÷

        <Container sx={{ pb: 8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2">
              <DiamondIcon />
              {`${company.name}の商品`}
              <DiamondIcon />
            </Typography>
          </Box>
          {(company.products != null)
            ? (
            <CardList items={company.products} type='products' provider={true} setUpdate={setUpdate} update={update}></CardList>
              )
            : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>商品が登録されていません</Typography>
                <Typography>商品を登録する</Typography>
              </Box>
              )}
        </Container>
      </IntroductionCard>
        )
      : 'no company infomation'}
    </>
  )
}

export default CompanyMyPage
