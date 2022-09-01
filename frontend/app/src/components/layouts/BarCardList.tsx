import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Card, Typography, CardContent, Grid, CardActionArea, Avatar } from '@mui/material'

import { Creator } from '../../interface'

interface Props {
  items: Creator[]
}
export const BarCardList: FC<Props> = ({ items }) => {
  return (
    <Grid container spacing={3} sx={{ px: 8 }}>
      {items.map((item) => (
        <Grid item key={`creator_${item.id}`} xs={12} sm={12} md={6}>
          <CardActionArea component={Link} to={`/creators/${item.id}`}>
            <Card sx={{ display: 'flex', boxShadow: 1 }}>
              <CardContent sx={{ my: 'auto' }}>
                <Avatar
                  src={item.image}
                  sx={{ width: 110, height: 110, display: 'block', mx: 'auto' }}
                />
              </CardContent>
              <CardContent sx={{ flex: 1 }}>
              <Typography
                  gutterBottom
                  variant='h6'
                  sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    height: 90,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.introduction}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
  </Grid>
  )
}
