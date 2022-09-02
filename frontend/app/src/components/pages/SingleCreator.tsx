import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Typography, CardContent, Container, Box, Grid, Card, CardMedia } from '@mui/material'

import { useHandleGetSingleCreator } from '../hooks/creators'
import { IntroductionCard } from '../layouts/IntroductionCard'

const SingleCreator: FC = () => {
  const { id } = useParams<{id: string}>()
  const { creator, videos } = (id != null) ? useHandleGetSingleCreator(id) : { creator: undefined, videos: undefined }

  return (
    <>
    {(creator != null)
      ? (
      <IntroductionCard avatarImage={creator.image}>
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', pb: 5 }}>
              {creator.name}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
              {creator.introduction}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              登録者数: {creator.subscriberCount}<br />
            </Typography>
          </CardContent>
        </Container>

        <Container sx={{ pb: 8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2">
              {` ${creator.name} の動画`}
            </Typography>
          </Box>
          {(videos != null)
            ? (
            <Grid container spacing={1} sx={{ px: 8 }}>
            {videos.map((video, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1 }}
                >
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      height: 100,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                      {video.title}
                    </Typography>
                    <Typography
                    variant='body2'
                    sx={{
                      height: 100,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {video.introduction}
                    </Typography>
                    <Typography component='a' href={video.url}>
                      Youtubeでこの動画を見る
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
              )
            : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
        )
      : 'no creator infomation'}
    </>
  )
}

export default SingleCreator
