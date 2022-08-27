
import React, { FC, useContext } from 'react'
import { auth } from '../../lib/api/firebase'
import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

import { CreatorAuthContext } from '../providers/CreatorAuthProvider'
import { login } from '../../lib/api/creator'
import { MessageContext } from '../providers/MessageProvider'

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

  const checkLogint: () => void = () => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        const uid = user.uid
        const email = user.email
        console.log(uid)
        console.log(email)
      } else {
        console.log('signed out')
      }
    })
  }

  checkLogint()

  const clickLogout: () => Promise<void> = async () => {
    try {
      await signOut(auth)
      setIsCreatorSignedIn(false)
      setOpen(true)
      setMessage('ログアウトしました')
      setSeverity('success')
      navigation('/')
    } catch (error) {
      console.log(error)
      setIsCreatorSignedIn(false)
      setOpen(true)
      setMessage('ログアウトに失敗しました')
      setSeverity('error')
    };
  }

  return (
    <>
      <h1>ログイン Google</h1>
      <div>
        <button onClick={() => { void clickLogin() }}>Login</button>
      </div>
      <div>
       <button onClick={() => { void clickLogout() }}>Logout</button>
      </div>
    </>
  )
}

export default CreatorSignIn
