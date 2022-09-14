import React, { FC, useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { TextField, Avatar, Container, Box, Grid, Typography, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { signUp } from '../../lib/api/auth'
import { SignUpData } from '../../interface/index'
import { CompanyAuthContext } from '../providers/CompanyAuthProvider'
import { MessageContext } from '../providers/MessageProvider'

const CompanySignUp: FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const emailRef = useRef<HTMLInputElement>(null)
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const confirmationRef = useRef<HTMLInputElement>(null)
  const [confirmationError, setConfirmationError] = useState(false)
  const { setIsCompanySignedIn, setCurrentCompany } = useContext(CompanyAuthContext)
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const navigation = useNavigate()
  const EmailVaildPattern =
  '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'

  const formValidation: () => boolean = () => {
    let valid = true

    const e = emailRef?.current
    if (e != null) {
      const ok = e.validity.valid
      setEmailError(!ok)
      valid = ok
    }

    const c = confirmationRef?.current
    if (c != null) {
      if (passwordConfirmation.length > 0 &&
          passwordConfirmation !== password) {
        c.setCustomValidity('パスワードが一致しません')
      } else {
        c.setCustomValidity('')
      }
      const ok = c.validity.valid
      setConfirmationError(!ok)
      valid = ok
    }
    return valid
  }

  const handleSubmit: () => Promise<void> = async () => {
    const data: SignUpData = {
      name,
      email,
      password,
      passwordConfirmation
    }

    try {
      const res = await signUp(data)

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
      } else throw Error()
    } catch (err) {
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
                  inputProps={ { maxLength: 30 } }
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
                  inputRef={emailRef}
                  value={email}
                  error={emailError}
                  helperText={emailError && emailRef.current != null && emailRef.current.validationMessage}
                  inputProps={ { pattern: EmailVaildPattern } }
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
                  name="password-confirmation"
                  label="パスワード（確認用）"
                  type="password"
                  id="password-confirmation"
                  autoComplete="new-password"
                  inputRef={confirmationRef}
                  value={passwordConfirmation}
                  error={confirmationError}
                  helperText={confirmationError && confirmationRef.current != null && confirmationRef.current.validationMessage}
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              disabled={!(name.length > 0 && password.length > 0 && passwordConfirmation.length > 0)}
              onClick={() => { if (formValidation()) { void handleSubmit() } } }
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
