import client from "./client"
import Cookies from "js-cookie"

import { SignUpData } from "../../interface/index"
import { SignInData } from "../../interface/index"

export const signUp = (data: SignUpData) => {
  return client.post("auth", data)
}

export const signIn = (data: SignInData)  => {
  return client.post("auth/sign_in", data)
}

export const signOut = () => {
  console.log('signoutatart')
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token") || '',
    "client": Cookies.get("_client") || '',
    "uid": Cookies.get("_uid") || ''
  }})
}
