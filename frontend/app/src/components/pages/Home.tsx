import React, { useContext } from "react"
import { Link } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import Image from "../../assets/images/24238523_m.jpg";

import { Box, Paper, Grid, Typography } from "@mui/material";

const Home: React.FC = () => {
  const { isSignedIn, currentCompany } = useContext(AuthContext);

  return (
    <>
      {/* hero */}
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          height: 500,
          mb: 4,
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
