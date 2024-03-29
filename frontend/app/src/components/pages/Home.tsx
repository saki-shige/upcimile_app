import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useHandleGetCompanies } from '../hooks/companies'
import { useHandleGetProducts } from '../hooks/products'
import { useHandleGetCreators } from '../hooks/creators'
import Image from '../../assets/images/24238523_m.jpg'

import { Box, Paper, Grid, Typography, Container, Button } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import FaceIcon from '@mui/icons-material/Face'
import { CardList } from '../layouts/CardList'
import { StyledTitleBox } from '../styled/Styled'
import { BarCardList } from '../layouts/BarCardList'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import BuildIcon from '@mui/icons-material/Build'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Home: React.FC = () => {
  const Number0fCompaniesForDisplay = 4
  const Number0fCoreatorsForDisplay = 4
  const Number0fProductsForDisplay = 4
  const companies = useHandleGetCompanies(Number0fCompaniesForDisplay)
  const creators = useHandleGetCreators(Number0fCoreatorsForDisplay)
  const products = useHandleGetProducts({ limit: Number0fProductsForDisplay })
  const navigation = useNavigate()

  return (
    <>
      {/* hero */}
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          height: 700,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${Image})`
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)'
          }}
        />
        <Grid container>
          <Grid item md={8}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 }
              }}
            >
              <Typography
                variant='h4'
                sx={{ my: 4 }}
                gutterBottom
                textAlign={'center'}
              >
                UPCICLE with SMILE
              </Typography>

              <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>COMPANY</Typography>
                  <DiamondIcon fontSize="large"/>
                  <Typography>商品を提供</Typography>
                </Box>
                <Box>
                  <ArrowRightAltIcon fontSize="large" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>CREATOR</Typography>
                  <BuildIcon fontSize="large" />
                  <Typography>動画撮影</Typography>
                </Box>
                <Box>
                  <ArrowRightAltIcon fontSize="large" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>LISTENER</Typography>
                  <FavoriteIcon fontSize="large"/>
                  <Typography>SMILE!!</Typography>
                </Box>
              </Container>
              <Container sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Typography variant='h6'>
                  台風によって傷ついた作物、
                  商品の製造過程で生じた副産物、
                  使われなくなった倉庫。<br/>
                  発想を加えることで、新たな魅力が見つかるかもしれません。<br/>
                </Typography>
              </Container>
              <Typography variant='h6' paragraph>
                UPCIMILEは商品を提供したい企業とクリエイター（youtuber）とを結びつけます。<br/>
                UPCIMILE上の「商品」とは、廃棄されたり、倉庫に眠ってしまっているもののこと。<br/>
                企業は商品をUPCIMILEに登録、クリエイターは企業に対し「オファー」（商品の提供を希望すること）をすることができます。<br/>
                クリエイターは提供された商品にアイディアを加えて活用し、企業、クリエイター自身、そして視聴者が笑顔になるような動画を撮影します。<br/>
              </Typography>
            </Box>
          </Grid>
        </Grid>

      </Paper>
      {/* End hero unit */}
      <StyledTitleBox>
        <Typography
          variant='h6'
          color='inherit'
          paragraph
          sx={{ mt: 3, mb: 0 }}
        >
          <DiamondIcon />
            {' NEW PRODUCTS '}
          <DiamondIcon />
        </Typography>
        <Typography paragraph sx={{ mb: 1 }}>
          <Button
            onClick={() => { navigation('/products') }}
            startIcon={<ArrowRightIcon />}
          >
            商品一覧を見る
          </Button>
        </Typography>
      </StyledTitleBox>
      <Container
        maxWidth={false}
        sx={{ py: 5, bgcolor: 'primary.light' }}
      >
        {products != null &&
          <CardList items={products} type='products' />
        }
      </Container>

      <StyledTitleBox>
        <Typography
          variant='h6'
          color='inherit'
          paragraph
          sx={{ mt: 3, mb: 0 }}
        >
          <AccessibilityNewIcon />
            {' NEW CREATERS '}
          <AccessibilityNewIcon />
        </Typography>
        <Typography paragraph sx={{ mb: 2 }}>
          <Button
            onClick={() => { navigation('/creators') }}
            startIcon={<ArrowRightIcon />}
          >
            クリエイター一覧を見る
          </Button>
        </Typography>
      </StyledTitleBox>
      <Container
        maxWidth={false}
        sx={{ py: 5, bgcolor: 'primary.light' }}
      >
        {(creators != null) &&
          <BarCardList items={creators} />
        }
      </Container>

      <StyledTitleBox>
        <Typography
          variant='h6'
          color='inherit'
          paragraph
          sx={{ mt: 3, mb: 0 }}
        >
          <FaceIcon />
            {' NEW COMPANIES '}
          <FaceIcon />
        </Typography>
        <Typography paragraph sx={{ mb: 2 }}>
          <Button
            onClick={() => { navigation('/companies') }}
            startIcon={<ArrowRightIcon />}
          >
            企業一覧を見る
          </Button>
        </Typography>
      </StyledTitleBox>
      <Container
        maxWidth={false}
        sx={{ py: 5, bgcolor: 'primary.light' }}
      >
        {companies != null &&
          <CardList items={companies} type='companies' />
        }
      </Container>
    </>
  )
}

export default Home
