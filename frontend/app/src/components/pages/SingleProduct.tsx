import React, { useState, useEffect } from "react"

import { getSingleProduct } from '../../lib/api/product';
import { Product } from "../../interface";

const SingleProduct = () => {
  const [ product, setProduct ] = useState<Product>();

  const handleGetProduct = async() => {
    let id = window.location.pathname.split('/products')[1];
    if (id !== '') {
      id = id.split('/')[1];
    }

    try {
      const res = await getSingleProduct(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setProduct(res.data)
      } else {
        console.log("No products")
      }
    } catch (err) {
      console.log(err)
    }

    // setLoading(false)

  }

  useEffect(()=>{
    console.log('商品情報取得開始')
    handleGetProduct()
  },[]);

  return(
    <>
      <p>singleproduct</p>
      {product?(
          <div>
             <img src={product.image.url} />
             <p>{product.name}</p>
             <p>{product.introduction}</p>
          </div>
      ):''}
    </>
  )
}

export default SingleProduct;
