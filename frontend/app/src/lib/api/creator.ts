import { AxiosResponse } from 'axios'
import { Creator, Video } from '../../interface'
import client from './client'

interface SingleCreatorResponse {
  creatorInfo: Creator
  creatorVideos: Video[]
}
interface LoginResponse {
  creatorInfo: Creator
}

export const login: (data: {idToken: string, accessToken: string}) => Promise<AxiosResponse<LoginResponse>> = async (data) => {
  return await client.post('/auth/creators', data)
}

export const getCreators: (limit?: number) => Promise<AxiosResponse<Creator[]>> = async (limit) => {
  return await client.get((limit !== undefined) ? `/creators?limit=${limit}` : '/creators')
}

export const getSingleCreator: (id: string) => Promise<AxiosResponse<SingleCreatorResponse>> = async (id) => {
  return await client.get(`creators/${id}`)
}
