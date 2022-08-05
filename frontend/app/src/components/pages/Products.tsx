import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleGetProducts } from "../functionals/products";
import { Product } from "../../interface";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<Product[]>([])
  const navigation = useNavigate();

  const handleShowProduct = (e : React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    navigation(`/products/${id}`);
  }

  useEffect(()=>{
    const f = async() => {
      const products = await handleGetProducts();
      setProducts(products);
    }
    f();
  },[]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {products.map((item) => (
        <div className={'itembox'} onClick={handleShowProduct} data-id={item.id}>
          <ImageListItem key={item.id}>
            <img src={item.image.url} alt={item.name} loading="lazy"/>
            <ImageListItemBar
              title={item.name}
              subtitle={<span>{item.introduction}</span>}
              position="below"
            />
          </ImageListItem>
        </div>
      ))}
    </ImageList>
  );

}

export default Products;
