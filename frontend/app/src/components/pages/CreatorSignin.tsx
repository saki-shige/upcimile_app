
import React, { FC, useContext } from 'react'
import { auth } from '../../lib/api/firebase'
import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { login } from '../../lib/api/creator'
import { MessageContext } from '../providers/MessageProvider'
import { Box, Button, Typography } from '@mui/material'

const CreatorSignIn: FC = () => {
  const navigation = useNavigate()
  const provider = new GoogleAuthProvider()
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const { isCreatorSignedIn, setIsCreatorSignedIn, setCurrentCreator, setCurrentAccessToken } = useContext(CreatorAuthContext)
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly')

  const clickLogin: () => Promise<void> = async () => {
    try {
      const res = await signInWithPopup(auth, provider)
      console.log('signed in with google')
      const credential = GoogleAuthProvider.credentialFromResult(res)
      const accessToken = (credential != null) ? credential.accessToken : undefined
      const currentUser = auth.currentUser
      if ((currentUser != null) && (accessToken !== undefined)) {
        const idToken = await currentUser.getIdToken(true)
        const config = { idToken, accessToken }
        await (handleLogin(config))
        setCurrentAccessToken(accessToken)
        setOpen(true)
        setMessage('ログインしました')
        setSeverity('success')
        navigation('/')
      } else { throw new Error() };
    } catch (err) {
      console.log('err')
      isCreatorSignedIn && setIsCreatorSignedIn(false);
      (auth.currentUser != null) && await signOut(auth)
      setOpen(true)
      setMessage('ログインに失敗しました')
      setSeverity('error')
    };
  }

  const handleLogin: (data: {idToken: string, accessToken: string}) => Promise<void> = async (data) => {
    console.log('handleLogin')
    const res = await login(data)
    console.log(res.data)
    setCurrentCreator(res.data.creatorInfo)
    setIsCreatorSignedIn(true)
  }

  return (
    <>
    <Box py={10} px={3} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' pb={5}>
        クリエイターとしてサインインするためには、Googleアカウントでサインインをします。<br />
        下記のボタンより、使用したいyoutubeチャンネルと紐づけられたgoogleアカウントでサインインしてください。
      </Typography>
      <Button variant="contained" onClick={() => { void clickLogin() }} size="large">
        サインイン
      </Button>
    </Box>
    </>
  )
}

export default CreatorSignIn
