import client from "./client"

import { SignUpData } from "../../interface/index"

export const signUp = (data: SignUpData) => {
  return client.post("auth", data)
}
