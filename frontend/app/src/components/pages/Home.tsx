import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

import { handleGetProducts } from "../functionals/products";
import { handleGetCreators } from "../functionals/creators";
import { handleGetCompanies } from "../functionals/companies";
import { Product, Creator, Company } from "../../interface";
import Image from "../../assets/images/24238523_m.jpg";

import { Box, Paper, Grid, Typography, Container, Card, CardMedia, CardContent, CardActionArea, Avatar } from "@mui/material";

const Home: React.FC = () => {
  const { isSignedIn, currentCompany } = useContext(AuthContext);
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ creators, setCreators ] = useState<Creator[]>([]);
  const [ companies, setCompanies ] = useState<Company[]>([]);

  useEffect(()=>{
    const f = async() => {
      Promise.all([handleGetProducts(), handleGetCreators(), handleGetCompanies()]).then((results)=>{
        setProducts(results[0].slice(0,4));
        setCreators(results[1].slice(0,4));
        setCompanies(results[2].slice(0,4));
        console.log(results);
      })
    }
    f();
  },[]);

  return (
    <>
      {/* hero */}
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          height: 500,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${Image})`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={8}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" sx={{my:5}} gutterBottom>
                UPCIMILE
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                台風によって傷ついた作物、
                パッケージが傷ついてしまった商品、
                商品の製造過程で生じた副産物、
                使われなくなった倉庫...
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                心を込めて作り出したもの、だからこそ、このままでは勿体無い。
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                ユニークな発想で、新たな価値にアップデートしませんか？<br/>
                違う視点を持つ人と協力することで新たに生じるアイデアがあるかもしれません。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* End hero unit */}

      <Container sx={{ pb:8, bgcolor: 'primary.main'}} maxWidth={false}>
        <Box sx={{ pt:3, px:12, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" paragraph>
            新着商品
          </Typography>
          <Typography variant="h6" color="inherit" paragraph>
            <Link to='/products'>商品一覧はこちら</Link>
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ px:8 }}>
          {products.map((product,index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}
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
      </Container>

      <Container sx={{ pb:8, bgcolor: 'primary.main'}} maxWidth={false}>
        <Box sx={{ pt:3, px:12, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" paragraph>
            creators
          </Typography>
          <Typography variant="h6" color="inherit" paragraph>
            <Link to='/products'>creator一覧はこちら</Link>
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ px:8 }}>
          {creators.map((creator) => (
            <Grid item xs={12} sm={12} md={6}>
              <CardActionArea component={Link} to={`/creators/${creator.id}`}>
                <Card sx={{ height: 150, display: 'flex', boxShadow: 3 }}>
                  <CardContent sx={{my:'auto'}}>
                    <Avatar
                      alt={creator.channelTitle}
                      src={creator.image.url}
                      sx={{ width: 110, height: 110, display: { xs: 'none', sm: 'block' } }}
                    />
                  </CardContent>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5" sx={{ textOverflow: 'ellipsis' }}>
                      {creator.channelTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      登録者数：{creator.subscriberCount}人
                    </Typography>
                    <Typography variant="subtitle1" paragraph sx={{ textOverflow: 'ellipsis' }}>
                      {creator.introduction}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb:8, bgcolor: 'primary.main'}} maxWidth={false}>
        <Box sx={{ pt:3, px:12, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" paragraph>
            companies
          </Typography>
          <Typography variant="h6" color="inherit" paragraph>
            <Link to='/companies'>企業一覧はこちら</Link>
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ px:8 }}>
          {companies.map((company) => (
            <Grid item xs={12} sm={12} md={6}>
              <CardActionArea component={Link} to={`/companies/${company.id}`}>
                <Card sx={{ height: 150, display: 'flex', boxShadow: 3 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5" sx={{ textOverflow: 'ellipsis' }}>
                      {company.name}
                    </Typography>
                    <Typography variant="subtitle1" paragraph sx={{ textOverflow: 'ellipsis' }}>
                    {company.introduction}
                    </Typography>
                  </CardContent>
                  <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                      image={company.image ? company.image.url : ''}
                      alt={company.name}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>

      <p>Home</p>
    {/* // (仮）サインインしているユーザー（カンパニー名）を表示 */}
      <h2>{isSignedIn ? <p>{currentCompany.name}としてサインインしています</p> : <p>サインインしていません</p>}</h2>
      <Link to={'/signin'}>sign in</Link>
      <Link to={'/signup'}>sign up</Link>
      <Link to={'/products/new'}>商品登録</Link>
      <Link to={'/creators/login'}>クリエイターログイン</Link>
    </>
  );
};

export default Home;
