import React, { useState, useEffect } from "react"
import { FC } from "react";
import { Link } from "react-router-dom";

import { Card, Typography, CardContent, Grid, CardActionArea, CardMedia } from "@mui/material";

import { Product, Company } from "../../interface";

type Props = {
  items: Product[] | Company[];
  type: 'products' | 'companies';
  provider?: boolean;
}
export const CardList: FC<Props> = (props) => {
  return(
    <Grid container spacing={1} sx={{ px:8 }}>
      {props.items.map((item,index) => (
        <Grid item data-testid={`${props.type}`} key={`${props.type}_${index}`} xs={12} sm={6} md={3}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 0, borderRadius: 0 }}
          >
            <CardActionArea component={Link} to={`/${props.type}/${item.id}`} data-testid={`${props.type}_${index}`}>
              <CardMedia
                component="img"
                image={item.image? item.image.url : ''}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography>
                  {item.introduction}
                </Typography>
                {props.provider && (
                <Typography>
                  <Link to={`/products/edit/${item.id}`}>商品を編集する</Link>
                </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

























