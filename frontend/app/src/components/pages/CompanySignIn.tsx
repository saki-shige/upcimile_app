import React, { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import { TextField, Avatar, Container, Box, Grid, Typography, Button} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Cookies from "js-cookie"
import { SignInData } from "../../interface/index"
import { signIn } from "../../lib/api/auth"
import { CompanyAuthContext } from "../providers/CompanyAuthProvider";


const CompanySignIn: React.FC = ()  => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { setIsCompanySignedIn, setCurrentCompany } = useContext(CompanyAuthContext)
  const navigation = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignInData = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsCompanySignedIn(true)
        setCurrentCompany(res.data.data)

        navigation("/")

        console.log("Signed in successfully!")
      } else {
        // setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      // setAlertMessageOpen(true)
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            m: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ my: 1, mx: 'auto', bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center'}}>
            Company Sign in
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={event => setEmail(event.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
              disabled={ !email || !password ? true : false}
            >
              サインイン
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/companies/signup'}>
                  {"アカウント作成はこちら"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default CompanySignIn;
