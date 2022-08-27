import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { TextField, Avatar, Container, Box, Grid, Typography, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { signUp } from '../../lib/api/auth'
import { SignUpData } from '../../interface/index'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { MessageContext } from '../providers/MessageProvider'

const CompanySignUp: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const { setIsCompanySignedIn, setCurrentCompany } = useContext(CompanyAuthContext)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const navigation = useNavigate()

  const handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (e) => {
    e.preventDefault()

    const data: SignUpData = {
      name,
      email,
      password,
      passwordConfirmation
    }

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers.client)
        Cookies.set('_uid', res.headers.uid)

        setIsCompanySignedIn(true)
        setCurrentCompany(res.data.data)

        setOpen(true)
        setMessage('ログインしました')
        setSeverity('success')

        navigation('/companies/mypage')

        console.log('Signed in successfully!')
      } else throw Error()
    } catch (err) {
      console.log(err)
      setOpen(true)
      setMessage('ログインに失敗しました')
      setSeverity('error')
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Conpany Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="名前"
                  autoFocus
                  onChange={event => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード（確認用）"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              disabled={!!((name.length === 0) || (email.length === 0) || (password.length === 0) || (passwordConfirmation.length === 0))}
              onClick={(e) => { void handleSubmit(e) }}
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/companies/signin'>
                  {'アカウントをお持ちですか？'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  )
}

export default CompanySignUp
