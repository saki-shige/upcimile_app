import React, { useState, useEffect } from "react"

import { Typography, CardContent, Container, Box, Grid, Card, CardActionArea, CardMedia} from "@mui/material";

import { getSingleCreator } from '../../lib/api/creator';
import { Creator } from "../../interface";
import { Video } from "../../interface";
import { IntroductionCard } from "../layouts/IntroductionCard";
import { ProductCard } from "../layouts/ProductCard";

const SingleCreator = () => {
  const [ creator, setCreator ] = useState<Creator>();
  const [ videos, setVideos ] = useState<Video[]>();

  const handleGetSingleCreator = async() => {
    let id = window.location.pathname.split('/creators')[1];
    if (id !== '') {
      id = id.split('/')[1];
    }

    try {
      const res = await getSingleCreator(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setCreator(res.data.creatorInfo);
        setVideos(res.data.videos);
      } else {
        console.log("No videos")
      }
    } catch (err) {
      console.log(err)
    }

    // setLoading(false)

  }

  useEffect(()=>{
    console.log('会社情報取得開始')
    handleGetSingleCreator()
  },[]);

  return(
    <>
    {creator ? (
      <IntroductionCard avatarImage={creator.icon}>
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{textAlign:'center', pb:5}}>
              {creator.channelTitle}
            </Typography>
            <Typography variant="body2" sx={{textAlign:'center', pb:3}}>
              {creator.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              登録者数: {creator.subscriberCount}<br />
            </Typography>
          </CardContent>
        </Container>

        <Container sx={{ pb:8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="inherit" paragraph>
              {`${creator.channelTitle}の動画`}
            </Typography>
          </Box>
          {videos ? (
            <Grid container spacing={1} sx={{ px:8 }}>
            {videos.map((video,index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1 }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {video.title}
                      </Typography>
                      <Typography>
                        {video.description}
                      </Typography>
                      <Typography component='a' href={video.url}>
                        Youtubeでこの動画を見る
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          ) : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
      ) : 'no creator infomation'}
    </>
  )
}

export default SingleCreator;
