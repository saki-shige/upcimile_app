import React from 'react'
import { Link } from 'react-router-dom'

import { useHandleGetCreators } from '../hooks/creators'

import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'

const Creators: React.FC = () => {
  const creators = useHandleGetCreators()

  return (
    <>
    <Box sx={{ my: 5, px: 10, mx: 'auto' }}>
      <Typography sx={{ textAlign: 'center' }}>
        企業一覧
      </Typography>
    </Box>
    <Card
      sx={{
        backgroundColor: 'white',
        width: '80%',
        maxWidth: 1100,
        py: 10,
        mx: 'auto',
        mb: 10,
        zIndex: 'modal',
        borderRadius: 2
      }}
    >
      <Grid container spacing={1} sx={{ px: 8 }}>
        {creators !== null && creators && creators.map((creator, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} data-testid='creators'>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 0, borderRadius: 0 }}
            >
              <CardActionArea component={Link} to={`/creators/${creator.id}`} data-testid={`creators_${index}`}>
                <CardMedia
                  component="img"
                  image={creator.image}
                  alt={creator.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {creator.name}
                  </Typography>
                  <Typography>
                    {creator.introduction}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
    </>
  )
}

export default Creators
