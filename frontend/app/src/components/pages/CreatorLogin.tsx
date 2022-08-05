
import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/api/firebase';
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from 'firebase/auth'

import { login } from '../../lib/api/creator';
import { getChannelId } from '../../lib/api/creator';

const CreatorLogin = () => {
  const navigation = useNavigate();
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

  const clickLogin = async () => {
    const channelId = await signInGoogle();
    const currentUser = auth.currentUser;
    if (auth && currentUser) {
      const idToken = await currentUser.getIdToken(true);
      const config = { idToken, channelId};
      await handleLogin(config);
    }
  };

  const signInGoogle = async () => {
    try{
      const res = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const accessToken = credential ? credential.accessToken : '';
      const foo = await handleGetChannelId(accessToken || '')
      navigation('/');
      return foo
    } catch(err){console.log('err')};
  };


  const handleGetChannelId = async (accsesToken: string) => {
    try {
      const res = await getChannelId(accsesToken);
      if (res.status === 200) {
        return res.data.items[0].id
      } else {
        console.log("ログイン情報の保存に失敗しました");
      };
    } catch (err) {
      console.log(err);
    };
  };

  const handleLogin = async (data: any) => {
    try {
      const res = await login(data);

      if (res.status === 200) {
        console.log(res.data);
      } else {
        console.log("ログイン情報の保存に失敗しました");
      };
    } catch (err) {
      console.log(err);
    };
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
    }catch(error){
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    };
  }

  return (
    <div>
      <h1>ログイン Google</h1>
      <div>
        <button onClick={clickLogin}>Login</button>
      </div>
      <div>
       <button onClick={() => clickLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default CreatorLogin