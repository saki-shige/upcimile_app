import React, { FC, useContext } from 'react'

import { Typography, CardContent, Container, Box } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'

import { BasicTable } from '../layouts/OfferTable'
import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { IntroductionCard } from '../layouts/IntroductionCard'

const CreatorMyPage: FC = () => {
  const { currentCreator } = useContext(CreatorAuthContext)

  return (
    <>
    {(currentCreator != null)
      ? (
      <IntroductionCard avatarImage={(currentCreator != null) ? currentCreator.image : ''}>
        <Container
          sx={{
            width: 400,
            pt: 10,
            mx: 'auto'
          }}
        >
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{ textAlign: 'center', pb: 5 }}
            >
              {currentCreator.name}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', pb: 3 }}>
              {currentCreator.introduction}
            </Typography>
          </CardContent>
        </Container>
        <Container sx={{ marginY: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2">
              <CelebrationIcon />
              あなたのオファー
              <CelebrationIcon />
            </Typography>
          </Box>
          <BasicTable type='myOffers' />
        </Container>
      </IntroductionCard>
        )
      : 'no currentCreator infomation'}
    </>
  )
}

export default CreatorMyPage
