import client from './client'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'
import { MyOffers, OffersToMe } from '../../interface'

export const makeOffer: (data: { idToken: string, product_id: string }) => Promise<AxiosResponse> = async (data) => {
  return await client.post('/offers', data)
}

export const respondToOffer: (id: number, type: 'accept' | 'decline') => Promise<AxiosResponse> = async (id, type) => {
  return await client.put(`/offers/${id}?type=${type}`, {}, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export const getOffersToMe: () => Promise<AxiosResponse<OffersToMe[]>> = async () => {
  return await client.get('/offers?part=company', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export const getMyOffers: (data: { idToken: string }) => Promise<AxiosResponse<MyOffers[]>> = async (data) => {
  return await client.get('/offers?part=creator', {
    headers: {
      Authorization: `Bearer ${data.idToken}`
    }
  })
}
