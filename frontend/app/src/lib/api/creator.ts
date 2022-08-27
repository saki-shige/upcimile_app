import client from './client'

export const login = (data: {idToken: string, accessToken: string}) => {
  return client.post('/auth/creators', data)
}

export const getCreators = (limit?: number) => {
  return client.get((limit !== undefined) ? `/creators?limit=${limit}` : '/creators')
}

export const getSingleCreator = (id: string) => {
  return client.get(`creators/${id}`)
}
