import React, { useState, useEffect } from "react"
import { FC } from "react";
import { Link } from "react-router-dom";

import { Card, Typography, CardContent, Grid, CardActionArea, CardMedia } from "@mui/material";

import { Product } from "../../interface";

type Props = {
  products: Product[];
}
export const ProductCard: FC<Props> = (props) => {
  return(
    <Grid container spacing={1} sx={{ px:8 }}>
      {props.products.map((product,index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1 }}
          >
            <CardActionArea component={Link} to={`/products/${product.id}`}>
              <CardMedia
                component="img"
                image={product.image.url}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>
                  {product.introduction}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

























