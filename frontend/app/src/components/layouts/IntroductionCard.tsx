import React, { FC } from 'react'

import { Paper, Avatar, Card, Typography } from '@mui/material'

import Image from '../../assets/images/24238523_m.jpg'

interface Props {
  avatarImage?: string
  children: React.ReactNode
}

export const IntroductionCard: FC<Props> = (props) => {
  const { avatarImage, children } = props

  return (
    <>
      <Typography
        component='div'
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: '0px',
          padding: '0px'
        }}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: '#fff',
            width: '100%',
            height: 500,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${Image})`,
            zIndex: -1
          }}
        >
        </Paper>
        {(avatarImage !== undefined)
          ? (
          <Avatar
          alt={'no image'}
          src={avatarImage}
          sx={{
            width: 150,
            height: 150,
            posotion: 'absolute',
            top: 100,
            mx: 'auto',
            zIndex: 'tooltip'
          }}
          />
            )
          : ''}
        <Card
          sx={{
            backgroundColor: 'white',
            width: '90%',
            mt: 5,
            mb: 15,
            mx: 'auto',
            zIndex: 'modal',
            borderRadius: 2
          }}
        >
          {children}
        </Card>
      </Typography>
    </>
  )
}
