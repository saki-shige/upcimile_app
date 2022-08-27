import React, { FC, useContext } from 'react'

import { Typography, CardContent, Container } from '@mui/material'

import { BasicTable } from '../layouts/OfferTable'
import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { IntroductionCard } from '../layouts/IntroductionCard'

const CreatorMyPage: FC = () => {
  const { currentCreator } = useContext(CreatorAuthContext)

  return (
    <>
      <IntroductionCard avatarImage={(currentCreator != null) ? currentCreator.image : ''}>
    {(currentCreator != null)
      ? (
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <CardContent>
            <Typography variant='h5' component='div' sx={{ textAlign: 'center', pb: 5 }}>
              {currentCreator.name}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', pb: 3 }}>
              {currentCreator.introduction}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              登録者数: {currentCreator.subscriberCount}<br />
            </Typography>
          </CardContent>
          </Container>
        )
      : 'no currentCreator infomation'}

            <Container
            sx={{
              py: 10
            }}
            >
      <BasicTable type='myOffers'></BasicTable>
      </Container>

      </IntroductionCard>
    </>
  )
}

export default CreatorMyPage
