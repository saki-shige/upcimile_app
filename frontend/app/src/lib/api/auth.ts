import client from "./client"

import { SignUpData } from "../../interface/index"
import { SignInData } from "../../interface/index"

export const signUp = (data: SignUpData) => {
  return client.post("auth", data)
}

export const signIn = (data: SignInData)  => {
  return client.post("auth/sign_in", data)
}
