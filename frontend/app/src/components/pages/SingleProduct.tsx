import React, { FC, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { Typography, CardContent, Container, Box, Grid, Avatar, Button, Card, CardActionArea, CardMedia } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'
import FaceIcon from '@mui/icons-material/Face'

import { useHandleGetSingleProduct } from '../hooks/products'
import { auth } from '../../lib/api/firebase'
import { makeOffer } from '../../lib/api/offer'
import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { IntroductionCard } from '../layouts/IntroductionCard'
import { CardList } from '../layouts/CardList'
import { CompanyIntroduction } from '../layouts/CompanyIntroduction'
import { MessageContext } from '../providers/MessageProvider'
import { StyledNoImageBox } from '../styled/Styled'

const SingleProduct: FC = () => {
  const { id } = useParams<{id: string}>()
  const { isCreatorSignedIn } = useContext(CreatorAuthContext)
  const { product, relatedProducts, company } = useHandleGetSingleProduct(id)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const navigation = useNavigate()

  const handleMakeOffer: () => Promise<void> = async () => {
    const currentUser = auth.currentUser
    if ((currentUser != null) && (id !== undefined)) {
      const idToken = await currentUser.getIdToken(true)
      console.log(idToken)
      const config = { idToken, product_id: id }
      const res = await makeOffer(config)
      console.log(res)
      setOpen(true)
      setMessage('提供を希望しました。企業からの返事をお待ちください。')
      setSeverity('success')
    } else {
      setOpen(true)
      setMessage('ログインしてください')
      setSeverity('error')
    }
  }

  return (
    <>
    {(product != null)
      ? (
        <IntroductionCard>
          <Container
            sx={{
              py: 8,
              mx: 'auto'
            }}
          >
            <Grid container spacing={0} justifyContent="center" sx={{ px: 4 }}>
              <Grid item md={4} sm={8} xs={12}>
              {(product.image?.url != null)
                ? (
                <CardMedia
                component='img'
                image={product.image.url}
                />
                  )
                : (
                  <StyledNoImageBox>
                    {product.name}
                  </StyledNoImageBox>
                  )}
              </Grid>
              <Grid item xs={12} sm={8} md={4}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center', pb: 5 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
                    {product.introduction}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', pb: 3 }}>
                  {isCreatorSignedIn
                    ? (
                    <Button onClick={() => { void handleMakeOffer() }}>この商品の提供を希望する</Button>
                      )
                    : (
                    <Button onClick={() => { navigation('/creators/signin') }}>ログインしてこの商品の提供を希望する</Button>
                      )}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
              {(company != null)
                ? (
                  <Card
                  sx={{
                    width: 400,
                    mt: 8,
                    mx: 'auto',
                    boxShadow: 0
                  }}
                  >
                    <CardActionArea component={Link} to={`/companies/${company.id}`}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography variant="subtitle2" mb={5}>
                        <FaceIcon />
                        {' 提 供 企 業 '}
                        <FaceIcon />
                      </Typography>
                    </Box>
                    <Avatar
                    alt={'no image'}
                    src={(company.image != null) ? company.image.url : ''}
                    sx={{
                      width: 150,
                      height: 150,
                      mx: 'auto'
                    }}
                    />
                    <CompanyIntroduction company= {company} />
                  </CardActionArea>
                  </Card>
                  )
                : ''}
            </Container>
            <Container sx={{ pb: 8 }} maxWidth={false}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="subtitle2" mb={5}>
                  <DiamondIcon />
                  {' 関 連 商 品 '}
                  <DiamondIcon />
                </Typography>
              </Box>
              {(relatedProducts != null)
                ? (
                <CardList items={relatedProducts} type='products'></CardList>
                  )
                : '商品が登録されていません'}
            </Container>
        </IntroductionCard>
        )
      : 'no product infomation'}
    </>
  )
}

export default SingleProduct
