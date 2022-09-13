import client from './client'
import Cookies from 'js-cookie'

import { SignUpData, SignInData, Company } from '../../interface/index'
import { AxiosResponse } from 'axios'

interface SignInResponse {
  data: Company
}

interface SignUpResponse {
  data: Company
}

export const signUp: (data: SignUpData) => Promise<AxiosResponse<SignUpResponse>> = async (data) => {
  return await client.post('auth', data)
}

export const signIn: (data: SignInData) => Promise<AxiosResponse<SignInResponse>> = async (data) => {
  return await client.post('auth/sign_in', data)
}

export const signInAsGuest: () => Promise<AxiosResponse<SignInResponse>> = async () => {
  return await client.post('auth/guest_sign_in', {})
}

export const signOut: () => Promise<AxiosResponse> = async () => {
  console.log('signoutatart')
  return await client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
