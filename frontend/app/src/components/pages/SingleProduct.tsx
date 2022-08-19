import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom";

import { Typography, CardContent, Container, Box, Grid, Avatar, Button } from "@mui/material";

import { auth } from '../../lib/api/firebase';
import { makeOffer } from "../../lib/api/offer";
import { CreatorAuthContext } from "../providers/CreatorAuthProvider";
import { getSingleProduct } from '../../lib/api/product';
import { Product } from "../../interface";
import { Company } from "../../interface";
import { IntroductionCard } from "../layouts/IntroductionCard";
import { CardList } from "../layouts/CardList";

const SingleProduct = () => {
  const [ product, setProduct ] = useState<Product>();
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();
  const [ company, setCompany ] = useState<Company>();
  const { isCreatorSignedIn } = useContext(CreatorAuthContext);
  const {id} = useParams<{id: string}>();
  const navigation = useNavigate()

  const handleGetProduct = async(id :string) => {
    try {
      const res = await getSingleProduct(id)
      console.log(res)

      if (res.status === 200) {
        console.log('商品詳細を取得しました')
        setProduct(res.data.product)
        setRelatedProducts(res.data.relatedProduct)
        setCompany(res.data.company)
      } else {
        console.log("No products")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    console.log('商品情報取得開始')
    id && handleGetProduct(id)
  },[]);

  const handleMakeOffer = async() => {
    const currentUser = auth.currentUser;
    console.log(auth);
    if (currentUser && id){
      const idToken = await currentUser.getIdToken(true);
      console.log(idToken);
      const config = { idToken, product_id: id };
      const res = await makeOffer(config);
      console.log(res)
    }else{
      console.log('ログインしてください')
    }
  }

  return(
    <>
    {product ? (
      <IntroductionCard avatarImage={''}>
        <Container
          sx={{
            // width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
        <Grid container spacing={2} justifyContent="center" sx={{mx:0, px:4}}>
          <Grid item md={4} sm={8} xs={12}
            sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#fff',
              width: 400,
              height: 300,
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${product.image.url})`,
            }}
          >
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{textAlign:'center', pb:5}}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{textAlign:'center', pb:3}}>
                {product.introduction}
              </Typography>
              <Typography variant="body2" sx={{textAlign:'center', pb:3}}>
              {isCreatorSignedIn ? (
                <Button onClick={handleMakeOffer}>この商品の提供を希望する</Button>
              ) : (
                <Button onClick={()=>{navigation('/creators/signin')}}>ログインしてこの商品の提供を希望する</Button>
              )}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
          {company ? (
        <Container
          sx={{
            width: 400,
            py: 10,
            mx: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="inherit" paragraph>
              提供企業
            </Typography>
          </Box>
          <Avatar
          alt={'no image'}
          src={company.image ? company.image.url : ''}
          sx={{
            width: 150,
            height: 150,
            mx: 'auto',
          }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{textAlign:'center', pb:5}}>
              {company.name}
            </Typography>
            <Typography variant="body2" sx={{textAlign:'center', pb:3}}>
              {company.introduction}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              住所: {company.address || 'Unregistered'}<br />
              連絡先: {company.email || 'Unregistered'}<br />
              創業: {company.dateOfEstablishment ? company.dateOfEstablishment : 'Unregistered'}<br />
              従業員数: {company.numberOfEmployees || 'Unregistered'}<br />
              資本金: {company.capital || 'Unregistered'}<br />
            </Typography>
            <Typography component='a' href={company.corporateSite} variant="body2" sx={{textAlign:'center', pb:3}}>
              詳しくは企業HPへ
            </Typography>
          </CardContent>
        </Container>
          ) : ''}
          </Container>

        <Container sx={{ pb:8 }} maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="inherit" paragraph>
              {`関連商品`}
            </Typography>
          </Box>
          {relatedProducts ? (
            <CardList items={relatedProducts} type='products'></CardList>
          ) : '商品が登録されていません'}
        </Container>
      </IntroductionCard>
      ) : 'no product infomation'}
    </>
  )
}

export default SingleProduct;
