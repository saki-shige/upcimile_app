import React, { useEffect, useState } from "react";

import { getProducts } from "../../lib/api/product";
import { Product } from "../../interface";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<Product[]>([])

  const handleGetProducts = async () => {
    try {
      const res = await getProducts()
      console.log(res)

      if (res.status === 200) {
        console.log('ユーザー一覧を取得しました')
        setProducts(res.data)
      } else {
        console.log("No users")
      }
    } catch (err) {
      console.log(err)
    }

    // setLoading(false)
  }

  useEffect(()=>{
    console.log('商品情報取得開始')
    handleGetProducts()
  },[]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {products.map((item) => (
        <ImageListItem key={item.id}>
          <img
            // src={`${item.img}?w=248&fit=crop&auto=format`}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={<span>by: {item.introduction}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

}

export default Products;
