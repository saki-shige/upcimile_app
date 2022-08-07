import React, { useEffect, useState } from "react";

import { handleGetProducts } from "../functionals/products";
import { Product } from "../../interface";
import { CardList } from "../layouts/CardList";

import { Card, Box, Typography } from "@mui/material";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<Product[]>([])

  useEffect(()=>{
    const f = async() => {
      const products = await handleGetProducts();
      setProducts(products);
    }
    f();
  },[]);

  return (
    <>
      <Box sx={{my: 5, px:10, mx: 'auto'}}>
        <Typography sx={{textAlign:'center'}}>
          商品一覧
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
          borderRadius: 2,
        }}
      >
        <CardList items={products} type='products'/>
      </Card>
    </>
  );

}

export default Products;
