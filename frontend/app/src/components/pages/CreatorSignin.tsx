
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../lib/api/firebase';
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from 'firebase/auth'

import { CreatorAuthContext } from '../providers/CreatorAuthProvider';
import { login } from '../../lib/api/creator';

const CreatorSignIn = () => {
  const navigation = useNavigate();
  const provider = new GoogleAuthProvider();
  const { isCreatorSignedIn, setIsCreatorSignedIn, setCurrentCreator, setCurrentAccessToken } = useContext(CreatorAuthContext)
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

  const clickLogin = async () => {
    try{
      const res = await signInWithPopup(auth, provider);
      console.log('signed in with google');
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const accessToken = credential && credential.accessToken;
      const currentUser = auth.currentUser;
      if (auth && currentUser && accessToken) {
        const idToken = await currentUser.getIdToken(true);
        const config = { idToken, accessToken };
        await (handleLogin(config))
        setCurrentAccessToken(accessToken);
        navigation('/')
      }else{throw new Error};
    }catch(err){
      console.log('err');
      isCreatorSignedIn && setIsCreatorSignedIn(false);
      auth.currentUser && await signOut(auth)
    };
  };

  const handleLogin = async (data: {idToken: string, accessToken: string}) => {
    console.log('handleLogin')
    const res = await login(data);
    console.log(res.data);
    setCurrentCreator(res.data.creatorInfo);
    setIsCreatorSignedIn(true);
  };

  const checkLogint = function(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log(uid);
        console.log(email);
      } else {
        console.log("signed out");
      }
    });
  }

  checkLogint();

  const clickLogout = async () => {
    try {
      await signOut(auth)
      console.log("ログアウトしました");
      setIsCreatorSignedIn(false);
    }catch(error){
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    };
  }

  return (
    <>
      <h1>ログイン Google</h1>
      <div>
        <button onClick={clickLogin}>Login</button>
      </div>
      <div>
       <button onClick={() => clickLogout()}>Logout</button>
      </div>
    </>
  );
};

export default CreatorSignIn
