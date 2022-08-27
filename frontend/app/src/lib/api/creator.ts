import client from './client'

export const login = (data: {idToken: string, accessToken: string}) => {
  return client.post('/auth/creators', data)
}

export const getCreators = () => {
  return client.get('/creators')
}

export const getSingleCreator = (id: string) => {
  return client.get(`creators/${id}`)
}
