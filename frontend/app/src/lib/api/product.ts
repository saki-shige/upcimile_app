import client from './client'
import Cookies from 'js-cookie'
import { Company, Product, UpdateProductFormData } from '../../interface'
import { AxiosResponse } from 'axios'

interface SingleProductResponse {
  product: Product
  relatedProducts: Product[]
  company: Company
}

export const getProducts: (limit?: number, category?: number) => Promise<AxiosResponse<Product[]>> = async (limit, category) => {
  const categoryQuery = (category != null) ? `category=${category}` : ''
  const limitQuery = (limit != null) ? `limit=${limit}` : ''
  return await client.get(`products?${categoryQuery}${limitQuery}`)
}

export const getSingleProduct: (id: string) => Promise<AxiosResponse<SingleProductResponse>> = async (id) => {
  return await client.get(`products/${id}`)
}

export const createProduct: (data: UpdateProductFormData) => Promise<AxiosResponse> = async (data) => {
  return await client.post('products', data, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export const updateProduct: (id: string, params: UpdateProductFormData) => Promise<AxiosResponse> = async (id, params) => {
  return await client.patch(`products/${id}`, params, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export const deleteProduct: (id: string) => Promise<AxiosResponse> = async (id: string) => {
  return await client.delete(`products/${id}`, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
