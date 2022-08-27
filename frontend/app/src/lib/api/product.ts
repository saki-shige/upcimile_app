import client from './client'
import Cookies from 'js-cookie'
import { UpdateProductFormData } from '../../interface'

export const getProducts = () => {
  return client.get('products')
}

export const getSingleProduct = (id: string) => {
  return client.get(`products/${id}`)
}

export const createProduct = (data: UpdateProductFormData) => {
  return client.post('products', data, { headers: {
    'content-type': 'multipart/form-data',
    'access-token': Cookies.get('_access_token') || '',
    'client': Cookies.get('_client') || '',
    'uid': Cookies.get('_uid') || '',
  }
  })
}

export const updateProduct = (id: string, params: any) => {
  return client.patch(`products/${id}`, params, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token') || '',
      'client': Cookies.get('_client') || '',
      'uid': Cookies.get('_uid') || '',
    }
  })
}

export const deleteProduct = (id: string) => {
  return client.delete(`products/${id}`, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token') || '',
      'client': Cookies.get('_client') || '',
      'uid': Cookies.get('_uid') || '',
    }
  })
}
